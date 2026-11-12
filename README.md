## 🗺️ Diagramas

Visão geral de como a aplicação funciona, da entrada do usuário até os dados chegando na tela.

### Fluxo da aplicação

<p align="center">
  <img src="https://github.com/user-attachments/assets/226d7634-6a8f-4187-b53c-6bdc619877c9" alt="Fluxo da aplicação" width="820" />
</p>

<p align="center"><sub>Do login até a área de cada tipo de usuário.</sub></p>

### Fluxo do ADM

<p align="center">
  <img src="https://github.com/user-attachments/assets/63b520f1-026f-4bd9-ab7b-4e66baf6afd6" alt="Fluxo do ADM" width="820" />
</p>

<p align="center"><sub>Como os dados saem do banco e chegam ao front-end.</sub></p>

| Camada | Responsabilidade |
| --- | --- |
| **Schema** | Define e constrói as tabelas no banco |
| **Funções Prisma** | Se comunicam com o banco (leitura e escrita) |
| **Mappers** | Traduzem os dados para o front e evitam conflitos de TypeScript |
| **Store** | Gerenciador de estado global do ADM |
| **Front-end** | Telas que consomem a store |

---

## 🧠 Tomada de decisões

> 🚧 **Em andamento.** Esta seção será escrita ao final da aplicação, com as escolhas técnicas e os motivos por trás delas.
