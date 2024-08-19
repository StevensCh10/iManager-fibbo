# Etapa de construção
FROM openjdk:17-jdk-slim AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o pom.xml e o código fonte
COPY pom.xml ./
COPY src ./src

# Instala o Maven
RUN apt-get update && apt-get install -y maven

# Executa o build sem os testes
RUN mvn clean package -DskipTests

# Etapa final
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo JAR da etapa de construção
COPY --from=build /app/target/imanager-0.0.1-SNAPSHOT.jar app.jar

# Exponha a porta do Spring Boot
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]