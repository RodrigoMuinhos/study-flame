# =====================
# CRM FLAME API - Dockerfile
# =====================
# Multi-stage build para otimização
# Updated: 2025-12-30

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependência primeiro (cache layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar código fonte e compilar
COPY src/ ./src/
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copiar JAR do stage de build
COPY --from=builder /app/target/*.jar app.jar

# Mudar para usuário não-root
USER appuser

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
