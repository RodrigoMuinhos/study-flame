# Build Stage
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /build
COPY api/pom.xml .
COPY api/src ./src
RUN mvn clean package -DskipTests -B

# Runtime Stage  
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
