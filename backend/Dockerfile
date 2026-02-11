# ---------- Build stage ----------
FROM gradle:8.7-jdk21 AS build
WORKDIR /app
COPY . .
RUN gradle clean shadowJar -x test


# ---------- Runtime stage ----------
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/build/libs/*all*.jar app.jar
EXPOSE 8080
ENV PORT=8080
CMD ["java", "-jar", "app.jar"]
