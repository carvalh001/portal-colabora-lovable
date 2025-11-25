# 🏢 Portal de Benefícios do Colaborador (PBC) - Frontend

<div align="center">

**Sistema didático e intencionalmente vulnerável para workshops de QA + Segurança**

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[🚀 Início Rápido](#-início-rápido-3-passos) • [📖 Documentação](#-sobre-o-projeto) • [🐛 Vulnerabilidades](#-explorando-vulnerabilidades) • [🎓 Workshop](#-guia-para-workshop)

</div>

---

## 🚀 Início Rápido (3 Passos)

### Pré-requisitos
- Node.js 18+ instalado ([baixar aqui](https://nodejs.org/))
- Backend rodando em `http://localhost:8000` ([ver backend](https://github.com/carvalh001/portal-colaborador-backend))

### Instalação e Execução

```bash
# 1️⃣ Instalar dependências
npm install --legacy-peer-deps

# 2️⃣ Criar arquivo de configuração
# Crie o arquivo .env.local com:
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local

# 3️⃣ Iniciar aplicação
npm run dev
```

🎉 **Pronto!** Acesse: **http://localhost:8080**

### 🔐 Credenciais de Teste

| Usuário | Username | Senha | Papel |
|---------|----------|-------|-------|
| 👤 Maria Santos | `maria` | `123456` | COLABORADOR |
| 👔 João Silva | `joao` | `123456` | GESTOR_RH |
| 👑 Ana Admin | `admin` | `admin123` | ADMIN |

---

## 📑 Sumário

- [🏢 Sobre o Projeto](#-sobre-o-projeto)
- [🎯 Objetivo Pedagógico](#-objetivo-pedagógico)
- [🏗️ Arquitetura e Funcionalidades](#️-arquitetura-e-funcionalidades)
- [🔐 Sistema de Autenticação e RBAC](#-sistema-de-autenticação-e-rbac)
- [🐛 Explorando Vulnerabilidades](#-explorando-vulnerabilidades)
- [🎓 Guia para Workshop](#-guia-para-workshop)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🧪 Testes e Ferramentas](#-testes-e-ferramentas)
- [🤝 Como Contribuir](#-como-contribuir)
- [📚 Documentação Adicional](#-documentação-adicional)

---

## 🏢 Sobre o Projeto

O **Portal de Benefícios do Colaborador (PBC)** é uma aplicação web moderna que simula um sistema interno de RH para gestão de colaboradores, benefícios e comunicação com o departamento de Recursos Humanos.

### ✨ Principais Funcionalidades

#### 👤 Para Colaboradores
- 📊 Visualizar benefícios pessoais (VR, VT, Plano de Saúde, etc.)
- 👤 Atualizar dados pessoais e bancários
- 💬 Enviar mensagens para o RH
- 🔐 Login seguro com autenticação JWT

#### 👔 Para Gestores de RH
- 📋 Listar todos os colaboradores
- 🔍 Visualizar detalhes de cada colaborador
- 📨 Gerenciar mensagens dos colaboradores
- 📊 Acessar logs de auditoria
- 🎁 Consultar benefícios dos colaboradores

#### 👑 Para Administradores
- 👥 Gerenciar usuários e papéis
- 🔄 Alterar permissões (COLABORADOR ↔ GESTOR_RH ↔ ADMIN)
- 📊 Acesso completo a logs e auditoria
- 🎯 Todas as funcionalidades de Gestor RH

### 🎬 Demo Visual

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Portal de Benefícios do Colaborador                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔐 Login  →  🏠 Home  →  📊 Dashboard                      │
│                    ↓                                         │
│              ┌─────┴─────┐                                  │
│              │           │                                  │
│          COLABORADOR   ADMIN/RH                              │
│              │           │                                  │
│    ┌─────────┼───────┐   └──────────────┐                  │
│    │         │       │                  │                  │
│  🎁 Benefícios  👤 Meus   💬 Mensagens    👥 Colaboradores  │
│              Dados                    📊 Logs              │
│                                       👥 Usuários          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Objetivo Pedagógico

### 🎓 Por que este projeto existe?

Este sistema foi criado especificamente para **workshops de QA e Segurança**, com o objetivo de:

1. **🔍 Ensinar Identificação de Vulnerabilidades**
   - Demonstrar falhas comuns em aplicações web
   - Mostrar como vulnerabilidades se manifestam na prática
   - Treinar analistas a pensar como atacantes

2. **📝 Treinar Especificação de Testes**
   - Criar casos de teste de segurança
   - Documentar vulnerabilidades encontradas
   - Classificar testes por pilares e tipos

3. **🏷️ Organizar em Azure DevOps**
   - Usar tags estruturadas (`pilar=`, `tipo_teste=`)
   - Criar checklists de segurança
   - Rastrear correções

4. **🔄 Simular Cenários Reais**
   - Contexto próximo ao mundo real (sistema de RH)
   - Vulnerabilidades representativas
   - Fluxos de trabalho autênticos

### ⚠️ **IMPORTANTE: Sistema Intencionalmente Vulnerável**

🚨 **Este código NÃO deve ser usado em produção!**

As vulnerabilidades são **propositais** e fazem parte do objetivo educacional do projeto.

---

## 🏗️ Arquitetura e Funcionalidades

### 📊 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   Pages      │   │   Services   │   │    Hooks     │   │
│  │  Components  │→  │   API Client │→  │ React Query  │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
│         ↓                  ↓                    ↓          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Auth Context (JWT Token)                 │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST + JWT
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│  │   Routes     │→  │     CRUD     │→  │    Models    │   │
│  │ (Endpoints)  │   │  (Business)  │   │ (SQLAlchemy) │   │
│  └──────────────┘   └──────────────┘   └──────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
                 ┌───────────────┐
                 │  PostgreSQL   │
                 └───────────────┘
```

### 🔄 Fluxo de Autenticação

```
1. Usuário faz login → POST /api/auth/login
2. Backend valida credenciais
3. Backend retorna JWT token + dados do usuário
4. Frontend armazena token no localStorage
5. Todas as requisições incluem: Authorization: Bearer {token}
6. Backend valida token em cada endpoint protegido
7. Frontend redireciona se token inválido (401)
```

### 📦 Módulos Principais

#### 🎨 **Camada de Apresentação** (`src/pages/`)
- **Login/Register**: Autenticação de usuários
- **Home**: Dashboard inicial
- **Benefits**: Visualização de benefícios
- **MyData**: Edição de dados pessoais
- **Messages**: Comunicação com RH
- **Admin**: Painéis administrativos

#### 🔌 **Camada de Serviços** (`src/services/`)
- **apiClient**: Cliente HTTP com interceptors
- **authService**: Login, registro, autenticação
- **userService**: Gestão de usuários
- **benefitService**: Consulta de benefícios
- **messageService**: Envio de mensagens
- **logService**: Auditoria

#### 🪝 **Camada de Dados** (`src/hooks/`)
- **React Query** para cache e sincronização
- **Hooks customizados** por domínio
- **Mutations** para operações de escrita

---

## 🔐 Sistema de Autenticação e RBAC

### 🎭 Papéis (Roles)

| Papel | Descrição | Permissões |
|-------|-----------|------------|
| **COLABORADOR** | Usuário padrão | ✅ Ver seus benefícios<br>✅ Editar seus dados<br>✅ Enviar mensagens<br>❌ Acessar área admin |
| **GESTOR_RH** | Gestor de RH | ✅ Tudo do COLABORADOR<br>✅ Ver todos os colaboradores<br>✅ Ver logs de auditoria<br>✅ Gerenciar mensagens<br>❌ Alterar papéis |
| **ADMIN** | Administrador | ✅ Tudo do GESTOR_RH<br>✅ Alterar papéis de usuários<br>✅ Acesso total ao sistema |

### 🔑 Implementação JWT

```typescript
// Token armazenado no localStorage
localStorage.setItem('access_token', token);

// Enviado em cada requisição
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Validado no backend em cada endpoint protegido
```

### 🛡️ Proteção de Rotas

```typescript
// Exemplo de rota protegida (Admin/Users.tsx)
const { user } = useAuth();

if (user?.papel !== 'ADMIN') {
  return <Redirect to="/access-denied" />;
}
```

---

## 🐛 Explorando Vulnerabilidades

### 📋 Vulnerabilidades Implementadas

O sistema contém **10+ vulnerabilidades intencionais** organizadas por pilares:

#### 🔐 **1. Pilar: Autenticação**

**🐛 Vulnerabilidade: Senhas Fracas**
```
✓ Como explorar:
1. Ir para /register
2. Criar conta com senha: "123"
3. Sistema aceita sem validação de complexidade

🎯 Impacto: Contas facilmente comprometidas
📝 Teste esperado: Rejeitar senhas < 8 caracteres
```

**🐛 Vulnerabilidade: Mensagens de Erro Informativas**
```
✓ Como explorar:
1. Login com username válido + senha errada
2. Observar mensagem: "Senha incorreta para o usuário maria"
3. Confirma que o username existe

🎯 Impacto: Enumeração de usuários
📝 Teste esperado: Mensagem genérica "Credenciais inválidas"
```

#### ⏱️ **2. Pilar: Sessão**

**🐛 Vulnerabilidade: Token sem Expiração Adequada**
```
✓ Como explorar:
1. Fazer login e copiar token
2. Aguardar 24h+
3. Token ainda funciona

🎯 Impacto: Sessões infinitas
📝 Teste esperado: Token expira em 30 minutos
```

**🐛 Vulnerabilidade: Sem Revogação de Token**
```
✓ Como explorar:
1. Fazer login
2. Fazer logout
3. Reutilizar token antigo via Postman
4. Token ainda válido

🎯 Impacto: Sessão não invalida
📝 Teste esperado: Token em blacklist após logout
```

#### 🔓 **3. Pilar: Autorização (IDOR)**

**🐛 Vulnerabilidade: Navegação Direta**
```
✓ Como explorar:
1. Login como Maria (COLABORADOR)
2. Abrir DevTools → Network
3. Acessar: GET /api/users/2
4. Consegue ver dados de outro usuário

🎯 Impacto: Acesso não autorizado
📝 Teste esperado: 403 Forbidden
```

**🐛 Vulnerabilidade: Exposição de Dados Sensíveis**
```
✓ Como explorar:
1. Login como qualquer usuário
2. GET /api/users/1
3. Resposta inclui CPF completo, dados bancários

🎯 Impacto: Vazamento de PII
📝 Teste esperado: Mascarar CPF (***.***.123-45)
```

#### 🎭 **4. Pilar: Manipulação**

**🐛 Vulnerabilidade: XSS em Mensagens**
```
✓ Como explorar:
1. Login como COLABORADOR
2. Criar mensagem com título: <script>alert('XSS')</script>
3. Sistema armazena sem sanitizar
4. Admin visualiza → script executa

🎯 Impacto: Execução de código malicioso
📝 Teste esperado: Sanitizar HTML antes de salvar
```

**🐛 Vulnerabilidade: Validação Apenas no Cliente**
```
✓ Como explorar:
1. Login como COLABORADOR
2. Abrir DevTools → Console
3. Fazer requisição direta:
   fetch('/api/users/me', {
     method: 'PUT',
     body: JSON.stringify({ email: 'email-invalido' })
   })
4. Backend aceita

🎯 Impacto: Bypass de validações
📝 Teste esperado: Validar no servidor
```

**🐛 Vulnerabilidade: Sem Proteção CSRF**
```
✓ Como explorar:
1. Criar página HTML maliciosa:
   <form action="http://localhost:8000/api/users/me" method="POST">
     <input name="email" value="hacker@evil.com">
   </form>
   <script>document.forms[0].submit();</script>
2. Vítima autenticada visita página
3. Dados alterados sem consentimento

🎯 Impacto: Ações não autorizadas
📝 Teste esperado: Implementar CSRF tokens
```

#### 📊 **5. Pilar: Auditoria**

**🐛 Vulnerabilidade: Logs Incompletos**
```
✓ Como explorar:
1. Login como COLABORADOR
2. Alterar dados bancários
3. Verificar logs (como ADMIN)
4. Evento não registrado com detalhes suficientes

🎯 Impacto: Dificulta investigação
📝 Teste esperado: Log com IP, timestamp, dados alterados
```

### 🔬 Ferramentas para Exploração

#### 1️⃣ **DevTools do Navegador** (F12)
```javascript
// Ver requisições
→ Network tab

// Manipular localStorage
localStorage.getItem('access_token')
localStorage.setItem('access_token', 'token-falso')

// Manipular DOM/validações
document.querySelector('input').removeAttribute('required')
```

#### 2️⃣ **Postman Collection**
- Importar: `PBC_API.postman_collection.json` (do backend)
- Testar endpoints diretamente
- Bypass de validações do frontend

#### 3️⃣ **Burp Suite** (Avançado)
- Interceptar requisições HTTP
- Modificar payloads
- Testar injeções

#### 4️⃣ **OWASP ZAP** (Scanner automático)
- Scan de vulnerabilidades
- Geração de relatórios

---

## 🎓 Guia para Workshop

### 📚 Roteiro Sugerido 

#### 🕐 **Módulo 1: Introdução**
- Apresentar o sistema
- Demonstrar funcionalidades
- Explicar objetivo pedagógico
- Mostrar estrutura de pilares

#### 🕑 **Módulo 2: Hands-On - Autenticação**
```
Atividades:
✓ Testar login com senhas fracas
✓ Observar mensagens de erro
✓ Registrar novo usuário com senha "123"
✓ Documentar vulnerabilidades encontradas
✓ Criar casos de teste no Azure DevOps

Tags: pilar=autenticacao, tipo_teste=seguranca
```

#### 🕒 **Módulo 3: Hands-On - Autorização**
```
Atividades:
✓ Login como COLABORADOR
✓ Tentar acessar /api/users/{outro_id}
✓ Manipular URLs para IDOR
✓ Verificar exposição de dados sensíveis
✓ Documentar findings

Tags: pilar=autorizacao, tipo_teste=idor
```

#### 🕓 **Módulo 4: Hands-On - Manipulação**
```
Atividades:
✓ Testar XSS em mensagens
✓ Bypass validações via DevTools
✓ Testar CSRF (criar página maliciosa)
✓ Documentar e classificar

Tags: pilar=manipulacao, tipo_teste=xss
```

#### 🕔 **Módulo 5: Auditoria e Logs**
```
Atividades:
✓ Realizar ações sensíveis
✓ Verificar logs gerados
✓ Identificar gaps de auditoria
✓ Propor melhorias

Tags: pilar=auditoria, tipo_teste=funcional
```

#### 🕕 **Módulo 6: Documentação e Reports**
```
Atividades:
✓ Consolidar vulnerabilidades encontradas
✓ Criar work items no Azure DevOps
✓ Classificar por severidade
✓ Propor correções
✓ Apresentar findings
```

### 📝 Template de Documentação

```markdown
## Vulnerabilidade: [Nome]

**Pilar**: Autenticação / Sessão / Autorização / Manipulação / Auditoria
**Severidade**: 🔴 Crítica / 🟠 Alta / 🟡 Média / 🟢 Baixa
**OWASP Top 10**: A01:2021 - Broken Access Control

### Descrição
[Como a vulnerabilidade se manifesta]

### Passos para Reproduzir
1. [Passo 1]
2. [Passo 2]
3. [Resultado observado]

### Impacto
[O que um atacante pode fazer]

### Evidência
[Screenshot/código/logs]

### Recomendação
[Como corrigir]

### Caso de Teste
**Given**: [Contexto]
**When**: [Ação]
**Then**: [Resultado esperado]

**Tags**: pilar=[pilar], tipo_teste=seguranca, severidade=[nivel]
```

### 🏷️ Sistema de Tags para Azure DevOps

```
Pilares:
- pilar=autenticacao
- pilar=sessao
- pilar=autorizacao
- pilar=manipulacao
- pilar=auditoria

Tipos de Teste:
- tipo_teste=seguranca
- tipo_teste=funcional
- tipo_teste=regressao
- tipo_teste=integracao

Severidade:
- severidade=critica
- severidade=alta
- severidade=media
- severidade=baixa

OWASP:
- owasp=a01_broken_access_control
- owasp=a03_injection
- owasp=a07_xss
```

---

## 🛠️ Stack Tecnológico

### 🎨 Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 18.3 | Framework UI |
| **TypeScript** | 5.6 | Type safety |
| **Vite** | 5.4 | Build tool |
| **React Router** | 6.x | Navegação SPA |
| **React Query** | 5.x | State management + cache |
| **Tailwind CSS** | 3.4 | Estilização |
| **shadcn-ui** | Latest | Componentes UI |
| **date-fns** | 4.1 | Manipulação de datas |
| **Lucide React** | Latest | Ícones |

### 🔧 Ferramentas de Desenvolvimento

- **ESLint**: Linting
- **PostCSS**: Processamento CSS
- **TypeScript**: Verificação de tipos
- **Vite**: Hot Module Replacement

### 🔗 Integração com Backend

- **API Base URL**: `http://localhost:8000/api`
- **Autenticação**: JWT Bearer Token
- **Formato**: JSON REST API
- **CORS**: Configurado para permitir `localhost:8080`

---

## 📁 Estrutura do Projeto

```
portal-colabora-lovable/
├── public/                      # Arquivos estáticos
│   └── assets/                  # Imagens, ícones
│
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── ui/                  # Componentes shadcn-ui
│   │   ├── ErrorBoundary.tsx    # Error handling global
│   │   ├── ErrorDisplay.tsx     # Exibição de erros
│   │   └── LoadingSkeleton.tsx  # Loading states
│   │
│   ├── contexts/                # React Context API
│   │   └── AuthContext.tsx      # Contexto de autenticação
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuthQueries.ts    # Hooks de autenticação
│   │   ├── useUserQueries.ts    # Hooks de usuários
│   │   ├── useBenefitQueries.ts # Hooks de benefícios
│   │   ├── useMessageQueries.ts # Hooks de mensagens
│   │   └── useLogQueries.ts     # Hooks de logs
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   ├── Login.tsx            # 🔐 Página de login
│   │   ├── Register.tsx         # 📝 Cadastro de usuários
│   │   ├── Home.tsx             # 🏠 Dashboard inicial
│   │   ├── Benefits.tsx         # 🎁 Listagem de benefícios
│   │   ├── MyData.tsx           # 👤 Dados pessoais
│   │   ├── Messages.tsx         # 💬 Mensagens para RH
│   │   └── admin/               # 👑 Páginas administrativas
│   │       ├── Employees.tsx    # 📋 Lista de colaboradores
│   │       ├── EmployeeDetail.tsx # 🔍 Detalhes do colaborador
│   │       ├── Users.tsx        # 👥 Gestão de usuários
│   │       └── Logs.tsx         # 📊 Auditoria
│   │
│   ├── services/                # Camada de API
│   │   ├── api.ts               # 🔌 Cliente HTTP base
│   │   ├── authService.ts       # 🔐 Serviços de autenticação
│   │   ├── userService.ts       # 👤 Serviços de usuários
│   │   ├── benefitService.ts    # 🎁 Serviços de benefícios
│   │   ├── messageService.ts    # 💬 Serviços de mensagens
│   │   └── logService.ts        # 📊 Serviços de logs
│   │
│   ├── types/                   # TypeScript types
│   │   └── index.ts             # 📝 Definições de tipos
│   │
│   ├── App.tsx                  # ⚛️ Componente raiz
│   ├── main.tsx                 # 🚀 Entry point
│   └── index.css                # 🎨 Estilos globais
│
├── .env.local                   # 🔧 Variáveis de ambiente (criar!)
├── package.json                 # 📦 Dependências
├── tsconfig.json                # ⚙️ Config TypeScript
├── vite.config.ts               # ⚙️ Config Vite
├── tailwind.config.ts           # ⚙️ Config Tailwind
└── README.md                    # 📖 Este arquivo
```

### 🔑 Arquivos Chave

#### `.env.local` (você precisa criar!)
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

#### `src/services/api.ts`
Cliente HTTP centralizado com:
- Interceptors para JWT
- Tratamento de erros global
- Redirecionamento em 401
- Timeout configurável

#### `src/contexts/AuthContext.tsx`
Gerenciamento de autenticação:
- Login/Logout
- Armazenamento de token
- Verificação de permissões
- Redirecionamento

---

## 🧪 Testes e Ferramentas

### 🔍 Testes Manuais

#### 1. Checklist de Funcionalidades

**Autenticação:**
- [ ] Login com credenciais válidas
- [ ] Login com credenciais inválidas
- [ ] Registro de novo usuário
- [ ] Logout
- [ ] Redirect em 401

**COLABORADOR:**
- [ ] Ver benefícios
- [ ] Editar dados pessoais
- [ ] Enviar mensagem para RH
- [ ] Não acessa área admin

**GESTOR_RH:**
- [ ] Ver todos colaboradores
- [ ] Ver detalhes de colaborador
- [ ] Ver mensagens
- [ ] Ver logs
- [ ] Não altera papéis

**ADMIN:**
- [ ] Alterar papel de usuário
- [ ] Ver todos os logs
- [ ] Todas as funcionalidades RH

#### 2. Checklist de Vulnerabilidades

- [ ] Testar senhas fracas
- [ ] Verificar mensagens de erro
- [ ] Testar IDOR em endpoints
- [ ] Injetar XSS em mensagens
- [ ] Bypass validações do cliente
- [ ] Reutilizar tokens após logout
- [ ] Verificar exposição de dados
- [ ] Testar CSRF

### 🛠️ Ferramentas Recomendadas

**Browser DevTools** (F12)
- Network: Ver requisições
- Console: Executar JavaScript
- Application: Inspecionar localStorage
- Elements: Manipular DOM

**Postman**
- Testar API diretamente
- Bypass frontend
- Collection incluída no backend

**Burp Suite Community**
- Proxy HTTP
- Interceptor de requisições
- Scanner básico

**OWASP ZAP**
- Scanner automático
- Geração de relatórios
- Gratuito e open source

---

## 🤝 Como Contribuir

### 🐛 Encontrou um Bug (não intencional)?

1. Verifique se já existe uma issue
2. Crie nova issue com:
   - Descrição clara
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se possível

### 💡 Quer Adicionar Vulnerabilidades?

1. Fork o repositório
2. Crie branch: `git checkout -b feature/nova-vulnerabilidade`
3. Implemente com documentação
4. Teste a exploração
5. Abra Pull Request

### 📝 Melhorias na Documentação

Pull requests para melhorar docs são sempre bem-vindos!

---

## 📚 Documentação Adicional

### 📖 Documentos Disponíveis

| Documento | Descrição |
|-----------|-----------|
| **README.md** (este arquivo) | Guia principal |
| **INTEGRATION_GUIDE.md** | Guia de integração frontend/backend |
| **Backend README** | Documentação do backend |
| **VULNERABILITIES.md** (backend) | Catálogo completo de vulnerabilidades |
| **TESTING.md** (backend) | Guia de testes |
| **POSTMAN_GUIDE.md** (backend) | Como usar Postman Collection |

### 🔗 Links Úteis

- 🔙 **Backend**: https://github.com/carvalh001/portal-colaborador-backend
- 📮 **API Docs (Swagger)**: http://localhost:8000/docs
- 📮 **API Docs (ReDoc)**: http://localhost:8000/redoc
- 🐛 **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- 📚 **React Docs**: https://react.dev/
- 📚 **TypeScript Docs**: https://www.typescriptlang.org/docs/

### 📞 Contato

Para dúvidas sobre o workshop ou projeto:
- Criar issue no GitHub
- Consultar documentação do backend

---

## ⚖️ Licença e Disclaimer

### ⚠️ **IMPORTANTE**

Este é um **sistema didático** com vulnerabilidades **intencionais** para fins **educacionais**.

**NÃO:**
- ❌ Use em produção
- ❌ Exponha publicamente na internet
- ❌ Armazene dados reais
- ❌ Use para fins maliciosos

**SIM:**
- ✅ Use em ambientes controlados
- ✅ Use para aprendizado
- ✅ Use em workshops internos
- ✅ Documente vulnerabilidades

### 📜 Licença

Este projeto é fornecido "como está" para fins educacionais.

---

<div align="center">

**Desenvolvido para workshops de QA + Segurança** 🎓🔐

[⬆️ Voltar ao topo](#-portal-de-benefícios-do-colaborador-pbc---frontend)

</div>
