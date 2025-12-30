# =====================
# CRM FLAME - Root Dockerfile (API for Railway)
# =====================
# This repository is a monorepo (api/ + frontend/).
# Railway/Railpack may fail to auto-detect builds from repo root.
# This Dockerfile makes root deploys build/run the Spring Boot API.

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copy API pom.xml first for dependency caching
COPY api/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

# Copy API sources
COPY api/src ./src

# Build JAR
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Non-root user
RUN addgroup -g 1001 -S appgroup \
    && adduser -u 1001 -S appuser -G appgroup

COPY --from=builder /app/target/*.jar app.jar

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
