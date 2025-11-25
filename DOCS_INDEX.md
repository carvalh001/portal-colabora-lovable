# 📚 Índice de Documentação - Portal de Benefícios do Colaborador

Guia completo de navegação para toda a documentação do projeto.

---

## 🚀 Por onde começar?

```
┌─────────────────────────────────────────────────────────┐
│                 Você está em qual situação?             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🏃 "Quero rodar AGORA!"                                │
│      → QUICK_START.md                                   │
│                                                         │
│  👋 "Primeira vez aqui, quero uma intro"                │
│      → WELCOME.md                                       │
│                                                         │
│  📖 "Quero entender tudo sobre o projeto"               │
│      → README.md (documento principal)                  │
│                                                         │
│  🔗 "Preciso integrar frontend e backend"               │
│      → INTEGRATION_GUIDE.md                             │
│                                                         │
│  🐛 "Quero ver exemplos de testes de segurança"         │
│      → TEST_CASES_EXAMPLES.md                           │
│                                                         │
│  🎓 "Vou dar um workshop"                               │
│      → README.md (seção Workshop)                       │
│      → TEST_CASES_EXAMPLES.md                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Frontend (Este Repositório)

### 📄 Documentos Principais

| Arquivo | Descrição | Quando usar |
|---------|-----------|-------------|
| **[WELCOME.md](./WELCOME.md)** | 👋 Boas-vindas e visão geral | Primeira vez no projeto |
| **[README.md](./README.md)** | 📖 Documentação completa | Referência principal |
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ Setup em 2 minutos | Iniciar rapidamente |
| **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** | 🔗 Guia de integração | Conectar frontend/backend |
| **[TEST_CASES_EXAMPLES.md](./TEST_CASES_EXAMPLES.md)** | 🧪 Exemplos de casos de teste | Workshop/documentação |
| **[DOCS_INDEX.md](./DOCS_INDEX.md)** | 📚 Este arquivo | Navegação entre docs |

### 📑 Estrutura do README.md

O README principal contém:

1. **🚀 Início Rápido** - 3 passos para começar
2. **📖 Sobre o Projeto** - O que é e por quê
3. **🎯 Objetivo Pedagógico** - Para que serve
4. **🏗️ Arquitetura** - Como funciona
5. **🔐 Autenticação e RBAC** - Sistema de permissões
6. **🐛 Explorando Vulnerabilidades** - 10+ vulnerabilidades detalhadas
7. **🎓 Guia para Workshop** - Roteiro de 4 horas
8. **🛠️ Stack Tecnológico** - Tecnologias usadas
9. **📁 Estrutura do Projeto** - Organização do código
10. **🧪 Testes e Ferramentas** - Como testar

---

## 🔙 Backend (Repositório Externo)

### 🔗 Link do Repositório
**https://github.com/carvalh001/portal-colaborador-backend**

### 📄 Documentos do Backend

| Arquivo | Descrição |
|---------|-----------|
| **README.md** | Documentação principal do backend |
| **QUICKSTART.md** | Setup rápido do backend |
| **TESTING.md** | Guia de testes do backend |
| **VULNERABILITIES.md** | Catálogo completo de vulnerabilidades |
| **DOCS_INDEX.md** | Índice de documentação do backend |
| **POSTMAN_GUIDE.md** | Como usar a Postman Collection |
| **PBC_API.postman_collection.json** | Collection Postman |

---

## 🗺️ Mapa de Navegação

### Fluxo: Iniciante → Avançado

```
1. WELCOME.md
   ↓
2. QUICK_START.md (rodar o sistema)
   ↓
3. README.md (entender o sistema)
   ↓
4. TEST_CASES_EXAMPLES.md (ver exemplos)
   ↓
5. INTEGRATION_GUIDE.md (entender integração)
   ↓
6. Backend VULNERABILITIES.md (detalhes técnicos)
```

### Fluxo: Workshop

```
Preparação:
1. README.md → Seção "Guia para Workshop"
2. TEST_CASES_EXAMPLES.md → Escolher casos de teste

Durante Workshop:
1. WELCOME.md → Apresentação
2. Demonstração ao vivo
3. TEST_CASES_EXAMPLES.md → Hands-on
4. Backend POSTMAN_GUIDE.md → Testes de API

Pós-Workshop:
1. README.md → Referência completa
2. Criar work items no Azure DevOps
```

---

## 📖 Guia de Leitura por Persona

### 👨‍💻 Desenvolvedor Frontend

```
✅ Prioridade Alta:
- README.md (setup e arquitetura)
- INTEGRATION_GUIDE.md
- QUICK_START.md

📌 Consultar quando necessário:
- TEST_CASES_EXAMPLES.md (entender vulnerabilidades)
- Backend README.md (entender API)
```

### 👨‍🔬 QA / Tester

```
✅ Prioridade Alta:
- README.md (entender sistema)
- TEST_CASES_EXAMPLES.md (exemplos de testes)
- Backend VULNERABILITIES.md (lista completa)
- Backend POSTMAN_GUIDE.md (testar API)

📌 Consultar quando necessário:
- INTEGRATION_GUIDE.md (entender integração)
- QUICK_START.md (rodar local)
```

### 👨‍🏫 Instrutor de Workshop

```
✅ Prioridade Alta:
- README.md (seção Workshop - roteiro 4h)
- TEST_CASES_EXAMPLES.md (material didático)
- Backend VULNERABILITIES.md (referência técnica)
- Backend POSTMAN_GUIDE.md (demonstrações)

📌 Preparar:
- Slides baseados no README
- Ambiente local funcionando
- Azure DevOps configurado
```

### 👔 Gestor / Product Owner

```
✅ Prioridade Alta:
- WELCOME.md (visão geral)
- README.md (seção "Sobre o Projeto")
- README.md (seção "Objetivo Pedagógico")

📌 Opcional:
- Backend VULNERABILITIES.md (entender riscos)
- TEST_CASES_EXAMPLES.md (ver exemplos práticos)
```

---

## 🔍 Busca Rápida

### Por Tema

#### 🚀 Setup e Instalação
- [QUICK_START.md](./QUICK_START.md)
- [README.md - Início Rápido](./README.md#-início-rápido-3-passos)
- Backend QUICKSTART.md

#### 🔐 Autenticação
- [README.md - Sistema de Autenticação](./README.md#-sistema-de-autenticação-e-rbac)
- [TEST_CASES_EXAMPLES.md - Pilar Autenticação](./TEST_CASES_EXAMPLES.md#-1-pilar-autenticação)
- Backend VULNERABILITIES.md → Autenticação

#### 🐛 Vulnerabilidades
- [README.md - Explorando Vulnerabilidades](./README.md#-explorando-vulnerabilidades)
- [TEST_CASES_EXAMPLES.md](./TEST_CASES_EXAMPLES.md) (exemplos práticos)
- Backend VULNERABILITIES.md (catálogo completo)

#### 🎓 Workshop
- [README.md - Guia para Workshop](./README.md#-guia-para-workshop)
- [TEST_CASES_EXAMPLES.md](./TEST_CASES_EXAMPLES.md)
- Backend POSTMAN_GUIDE.md

#### 🏗️ Arquitetura
- [README.md - Arquitetura e Funcionalidades](./README.md#️-arquitetura-e-funcionalidades)
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- Backend README.md → Arquitetura

#### 🧪 Testes
- [TEST_CASES_EXAMPLES.md](./TEST_CASES_EXAMPLES.md)
- [README.md - Testes e Ferramentas](./README.md#-testes-e-ferramentas)
- Backend TESTING.md

---

## 📊 Matriz de Conteúdo

| Tema | Frontend | Backend |
|------|----------|---------|
| **Setup** | QUICK_START.md | QUICKSTART.md |
| **Visão Geral** | README.md, WELCOME.md | README.md |
| **Vulnerabilidades** | README.md (resumo), TEST_CASES_EXAMPLES.md | VULNERABILITIES.md |
| **Testes** | TEST_CASES_EXAMPLES.md | TESTING.md, POSTMAN_GUIDE.md |
| **Integração** | INTEGRATION_GUIDE.md | README.md (API docs) |
| **Workshop** | README.md (roteiro) | VULNERABILITIES.md, POSTMAN_GUIDE.md |

---

## 🎯 Checklist de Leitura

### Para começar (obrigatório)
- [ ] Ler WELCOME.md
- [ ] Seguir QUICK_START.md
- [ ] Fazer login de teste
- [ ] Ler README.md (seção "Sobre o Projeto")

### Para entender (recomendado)
- [ ] Ler README.md completo
- [ ] Ver diagramas de arquitetura
- [ ] Entender RBAC
- [ ] Ler INTEGRATION_GUIDE.md

### Para praticar (hands-on)
- [ ] Seguir TEST_CASES_EXAMPLES.md
- [ ] Testar 3+ vulnerabilidades
- [ ] Usar Postman Collection
- [ ] Documentar findings

### Para ensinar (workshop)
- [ ] Estudar roteiro de workshop
- [ ] Preparar ambiente local
- [ ] Revisar todos os casos de teste
- [ ] Configurar Azure DevOps

---

## 🔗 Links Externos Úteis

### Referências de Segurança
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **OWASP Testing Guide**: https://owasp.org/www-project-web-security-testing-guide/
- **CWE**: https://cwe.mitre.org/
- **LGPD**: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm

### Tecnologias
- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **FastAPI**: https://fastapi.tiangolo.com/
- **Tailwind CSS**: https://tailwindcss.com/

### Ferramentas
- **Postman**: https://www.postman.com/
- **Burp Suite**: https://portswigger.net/burp
- **OWASP ZAP**: https://www.zaproxy.org/
- **jwt.io**: https://jwt.io/

---

## 📞 Suporte e Contribuição

### Precisa de ajuda?
1. Verifique a documentação relevante acima
2. Procure no [README.md](./README.md)
3. Consulte os exemplos em [TEST_CASES_EXAMPLES.md](./TEST_CASES_EXAMPLES.md)
4. Crie uma issue no GitHub

### Quer contribuir?
1. Leia [README.md - Como Contribuir](./README.md#-como-contribuir)
2. Fork o repositório
3. Crie branch para sua feature
4. Abra Pull Request

---

## 📝 Atualizações da Documentação

**Última atualização**: Novembro 2025

**Versão**: 1.0.0

**Responsável**: Equipe de Desenvolvimento

**Próximas melhorias planejadas**:
- [ ] Vídeos tutoriais
- [ ] Mais exemplos de testes
- [ ] FAQ expandido
- [ ] Tradução para inglês

---

<div align="center">

**📚 Índice de Documentação - PBC**

[🏠 Início](./README.md) • [⚡ Quick Start](./QUICK_START.md) • [👋 Welcome](./WELCOME.md) • [🧪 Testes](./TEST_CASES_EXAMPLES.md)

</div>

