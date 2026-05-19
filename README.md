# Edja Studio - Sistema de Agendamento e Cursos

Bem-vindo ao repositório do **Edja Studio**! Este projeto foi evoluído de um site estático para uma aplicação fullstack moderna, utilizando **Java com Spring Boot** no backend para gerenciar agendamentos, cursos e pagamentos de forma dinâmica e segura.

---

## 🚀 O que mudou?

Anteriormente, o Edja Studio era um conjunto de páginas HTML simples. Agora, o projeto conta com um ecossistema robusto que permite:
*   **Gestão Real: ** Dados salvos em banco de dados (MySQL).
*   **Segurança:** Controle de acesso com login, cadastro e recuperação de senha.
*   **Automatização:** Processamento de pagamentos e agendamentos automáticos.

---

## ✨ Funcionalidades Principais

### 👤 Gestão de Usuários
*   **Cadastro e Login:** Autenticação segura utilizando **JWT (JSON Web Tokens)**.
*   **Recuperação de Senha:** Sistema de "Esqueci minha senha" com envio de e-mail.
*   **Área do Aluno/Cliente:** Espaço personalizado para visualizar cursos e agendamentos.

### 📅 Agendamentos (Appointments)
*   Marcação de serviços de beleza de forma dinâmica.
*   Controle de horários e status de atendimento.

### 🎓 Cursos e Matrículas
*   Listagem dinâmica de cursos oferecidos pelo studio.
*   Matrícula online para alunos interessados.

### 💳 Pagamentos Integrados
*   Integração com o **Mercado Pago** para processar pagamentos de cursos e serviços com segurança.

---

## 🛠️ Tecnologias Utilizadas

### Backend (O "Coração" do novo sistema)
*   **Java 17**
*   **Spring Boot 3.2.5**
*   **Spring Security & JWT:** Para proteção de dados e rotas.
*   **Spring Data JPA:** Para comunicação com o banco de dados.
*   **MySQL:** Armazenamento persistente de informações.
*   **Spring Mail:** Envio de e-mails de confirmação e recuperação.
*   **Swagger/OpenAPI:** Documentação automática da API.

### Frontend
*   **HTML5, CSS3 e JavaScript:** Interface limpa, responsiva e focada na experiência do usuário.
*   **Integração Fetch API:** Comunicação dinâmica com o backend Java.

---

## 📂 Estrutura do Projeto

*   `src/main/java`: Contém a lógica de negócio (Controllers, Services, Repositories).
*   `src/main/resources/static`: Contém o frontend (HTML, CSS, JS e Imagens).
*   `pom.xml`: Gerenciamento de dependências Maven.

---

## ⚙️ Como executar o projeto localmente

1.  **Pré-requisitos:**
    *   Java 17 instalado.
    *   MySQL instalado e rodando.
    *   Maven.

2.  **Configuração do Banco:**
    *   Crie um banco de dados chamado `edja_studio`.
    *   Configure as credenciais no arquivo `src/main/resources/application.properties`.

3.  **Rodar a Aplicação:**
    ```bash
    mvn spring-boot:run
    ```
4.  **Acessar:**
    *   Site: `http://localhost:8080/index.html`
    *   Documentação da API (Swagger): `http://localhost:8080/swagger-ui.html`

---

## 📄 Licença
Este projeto foi desenvolvido para o **Edja Studio**. Todos os direitos reservados.
