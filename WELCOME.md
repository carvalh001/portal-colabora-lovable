# 👋 Bem-vindo ao Portal de Benefícios do Colaborador!

```
██████╗ ██████╗  ██████╗
██╔══██╗██╔══██╗██╔════╝
██████╔╝██████╔╝██║     
██╔═══╝ ██╔══██╗██║     
██║     ██████╔╝╚██████╗
╚═╝     ╚═════╝  ╚═════╝
                        
Portal de Benefícios do Colaborador
Sistema Didático para Workshops de QA + Segurança
```

---

## 🎯 Por onde começar?

### 🏃 **Estou com pressa!**
→ Vá para o [**QUICK_START.md**](./QUICK_START.md) - Setup em 2 minutos

### 📚 **Quero entender tudo!**
→ Leia o [**README.md completo**](./README.md) - Documentação completa

### 🐛 **Quero ver as vulnerabilidades!**
→ Vá para [**Explorando Vulnerabilidades**](./README.md#-explorando-vulnerabilidades)

### 🎓 **Vou dar um workshop!**
→ Siga o [**Guia para Workshop**](./README.md#-guia-para-workshop)

---

## 🎬 O que é este projeto?

O **PBC** é um sistema web moderno que simula um portal interno de RH para:
- 📊 Gerenciar benefícios de colaboradores
- 👤 Atualizar dados pessoais
- 💬 Comunicação com RH
- 👥 Gestão de usuários (área admin)

### ⚠️ Mas com um diferencial...

**É intencionalmente vulnerável!** 🔓

Este sistema foi criado para **ensinar** analistas de QA a:
- 🔍 Identificar vulnerabilidades de segurança
- 📝 Especificar testes de segurança
- 🏷️ Classificar e documentar findings
- 🎯 Pensar como um atacante

---

## 📊 Status do Projeto

```
✅ Frontend React + TypeScript
✅ Backend FastAPI + PostgreSQL
✅ Autenticação JWT + RBAC
✅ 10+ vulnerabilidades implementadas
✅ Docker Compose pronto
✅ Postman Collection incluída
✅ Documentação completa
```

---

## 🚀 Setup Rápido

### Pré-requisitos
- ✅ Node.js 18+
- ✅ Docker Desktop
- ✅ Git

### Comandos

**Backend:**
```bash
git clone https://github.com/carvalh001/portal-colaborador-backend.git
cd portal-colaborador-backend
docker compose up --build
```

**Frontend:**
```bash
cd portal-colabora-lovable
npm install --legacy-peer-deps
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local
npm run dev
```

**Acesse:** http://localhost:8080

---

## 🔐 Credenciais de Teste

| Nome | Username | Senha | Papel |
|------|----------|-------|-------|
| Maria Santos | `maria` | `123456` | COLABORADOR |
| João Silva | `joao` | `123456` | GESTOR_RH |
| Ana Admin | `admin` | `admin123` | ADMIN |

---

## 🎓 Pilares de Segurança

O sistema cobre 5 pilares principais:

```
┌─────────────────────────────────────────────────┐
│  1. 🔐 AUTENTICAÇÃO                             │
│     - Senhas fracas                             │
│     - Mensagens de erro informativas            │
├─────────────────────────────────────────────────┤
│  2. ⏱️  SESSÃO                                   │
│     - Timeout inadequado                        │
│     - Sem revogação de token                    │
├─────────────────────────────────────────────────┤
│  3. 🔓 AUTORIZAÇÃO                              │
│     - IDOR (Insecure Direct Object Reference)  │
│     - Exposição de dados sensíveis              │
├─────────────────────────────────────────────────┤
│  4. 🎭 MANIPULAÇÃO                              │
│     - XSS (Cross-Site Scripting)                │
│     - Validação apenas no cliente               │
│     - Sem proteção CSRF                         │
├─────────────────────────────────────────────────┤
│  5. 📊 AUDITORIA                                │
│     - Logs incompletos                          │
│     - Falta de rastreamento                     │
└─────────────────────────────────────────────────┘
```

---

## 🧪 Teste Sua Primeira Vulnerabilidade

### XSS em Mensagens (1 minuto)

1. Login: `maria` / `123456`
2. Ir em **"Mensagens"**
3. Nova mensagem:
   - Título: `<script>alert('XSS encontrado!')</script>`
   - Conteúdo: `Teste de XSS`
4. Enviar
5. Logout
6. Login como `admin` / `admin123`
7. Ver mensagens
8. 💥 **Script executa!**

**Você acabou de explorar uma vulnerabilidade XSS!**

---

## 📚 Documentação

| Documento | O que contém |
|-----------|--------------|
| 📘 [README.md](./README.md) | Guia completo do projeto |
| ⚡ [QUICK_START.md](./QUICK_START.md) | Setup em 2 minutos |
| 🔗 [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) | Integração frontend/backend |
| 🔙 [Backend README](https://github.com/carvalh001/portal-colaborador-backend) | Documentação do backend |

---

## 🛠️ Stack Tecnológico

**Frontend:**
- ⚛️ React 18
- 📘 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🧩 shadcn-ui
- 🔄 React Query

**Backend:**
- 🐍 Python + FastAPI
- 🐘 PostgreSQL
- 🔐 JWT Authentication
- 🐳 Docker

---

## ⚠️ Disclaimer

> **🚨 ATENÇÃO**
> 
> Este sistema contém vulnerabilidades **INTENCIONAIS** para fins **EDUCACIONAIS**.
> 
> **NÃO USE EM PRODUÇÃO!**
> 
> Use apenas em ambientes controlados para aprendizado e treinamento.

---

## 🤝 Contribua

Encontrou um bug não intencional? Quer adicionar mais vulnerabilidades?

1. Fork o repositório
2. Crie sua feature branch
3. Commit suas mudanças
4. Abra um Pull Request

---

## 📞 Suporte

- 🐛 Issues no GitHub
- 📖 Consulte a documentação
- 📮 Use a Postman Collection

---

<div align="center">

**Pronto para começar?**

[🚀 Setup Rápido](./QUICK_START.md) • [📖 Documentação Completa](./README.md) • [🐛 Vulnerabilidades](./README.md#-explorando-vulnerabilidades)

---

**Desenvolvido para workshops de QA + Segurança** 🎓🔐

</div>

