# ⚡ Quick Start - Portal de Benefícios do Colaborador

**Quer começar AGORA? Siga estes passos:**

## 🚀 Setup Completo em 2 Minutos

### 1️⃣ Backend (Terminal 1)

```bash
# Clone o backend
git clone https://github.com/carvalh001/portal-colaborador-backend.git
cd portal-colaborador-backend

# Suba tudo com Docker
docker compose up --build
```

✅ **Backend rodando em**: `http://localhost:8000`  
✅ **Swagger Docs**: `http://localhost:8000/docs`

---

### 2️⃣ Frontend (Terminal 2)

```bash
# Navegue para o diretório do frontend
cd portal-colabora-lovable

# Instale dependências
npm install --legacy-peer-deps

# Crie arquivo .env.local
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local

# Execute
npm run dev
```

✅ **Frontend rodando em**: `http://localhost:8080`

---

## 🔐 Login Rápido

Acesse `http://localhost:8080` e faça login:

| Usuário | Senha | Papel |
|---------|-------|-------|
| `maria` | `123456` | COLABORADOR |
| `joao` | `123456` | GESTOR_RH |
| `admin` | `admin123` | ADMIN |

---

## 🎯 Teste Rápido de Vulnerabilidade

### XSS em 30 segundos:

1. Login como `maria`
2. Ir em "Mensagens"
3. Criar mensagem com título: `<script>alert('XSS')</script>`
4. Enviar
5. Login como `admin`
6. Ver mensagens → 💥 XSS executado!

---

## 🐛 Problemas?

**Backend não sobe?**
- Certifique-se que Docker está rodando
- Verifique se portas 8000 e 5432 estão livres

**Frontend dá erro de dependências?**
- Use: `npm install --legacy-peer-deps`

**API não conecta?**
- Verifique se `.env.local` existe
- Confirme que backend está em `http://localhost:8000`

---

## 📖 Próximos Passos

- 📚 Leia o [README completo](./README.md) para entender o projeto
- 🐛 Explore as [vulnerabilidades documentadas](./README.md#-explorando-vulnerabilidades)
- 🎓 Siga o [roteiro do workshop](./README.md#-guia-para-workshop)
- 📮 Use a [Postman Collection](../portal-colaborador-backend/POSTMAN_GUIDE.md)

---

**🎉 Pronto! Agora é só explorar as vulnerabilidades!**

