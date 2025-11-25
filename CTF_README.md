# 🎯 CTF Challenge - Portal do Colaborador

Sistema de gamificação tipo **Capture The Flag** integrado ao Portal do Colaborador.

---

## 🚀 Features Implementadas

### Backend (FastAPI)
- ✅ Modelos de dados (CTFFlag, CTFSubmission)
- ✅ Schemas Pydantic para validação
- ✅ CRUD operations completo
- ✅ Endpoints REST API:
  - `POST /api/ctf/submit` - Submeter flags
  - `GET /api/ctf/leaderboard` - Ver ranking
  - `GET /api/ctf/stats` - Estatísticas gerais
  - `GET /api/ctf/easter-egg` - Endpoint escondido
  - `GET /api/ctf/my-submissions` - Submissões do usuário
  - `GET /api/ctf/flags` - Gerenciar flags (admin)
- ✅ Validações de segurança (rate limiting, sanitização)
- ✅ Sistema de slots limitados por dificuldade
- ✅ Hash SHA256 para flags
- ✅ Seed automático com flags

### Frontend (React + TypeScript)
- ✅ Página de submissão de flags (`/ctf`)
- ✅ Leaderboard público (`/ctf/leaderboard`)
- ✅ Componentes gamificados:
  - CTFBadge - Badges por dificuldade
  - CTFStats - Estatísticas visuais
  - ConfettiEffect - Animação de celebração
- ✅ Integração no menu principal com badge "NOVO"
- ✅ React Query para cache e atualização automática
- ✅ Toast notifications para feedback
- ✅ Design responsivo

### Flags Escondidas
- ✅ **Flag Fácil (10pts)**: Escondida no Footer (DOM inspection)
- ✅ **Flag Média (20pts)**: Endpoint oculto com header HTTP
- ✅ **Flag Difícil (30pts)**: Código ofuscado em Base64 no Home

---

## 📋 Configuração

### Variáveis de Ambiente

**Backend** (`.env`):
```bash
CTF_EASY_FLAGS=10
CTF_MEDIUM_FLAGS=5
CTF_HARD_FLAGS=3
CTF_EASY_POINTS=10
CTF_MEDIUM_POINTS=20
CTF_HARD_POINTS=30
CTF_SECRET_KEY=your-secret-key-here
```

---

## 🎮 Como Testar

### 1. Iniciar Backend
```bash
cd portal-colaborador-backend
uvicorn app.main:app --reload
```

O seed será executado automaticamente criando:
- 3 flags hasheadas
- Configurações padrão

### 2. Iniciar Frontend
```bash
cd portal-colabora-lovable
npm run dev
```

### 3. Testar Flags

#### Flag Fácil 🟢
1. Abra o navegador em `http://localhost:5173`
2. Faça login (ou acesse `/ctf` diretamente - é público)
3. Pressione F12 para abrir DevTools
4. Na aba Elements, procure no `<footer>`
5. Encontre o elemento oculto com a flag
6. Copie: `FLAG{1nsp3ct_th3_d0m_345y}`
7. Submeta em `/ctf`

#### Flag Média 🟡
1. No console do navegador, digite:
   ```javascript
   fetch('http://localhost:8000/api/ctf/easter-egg')
     .then(r => {
       console.log('Header:', r.headers.get('X-CTF-Flag'));
       return r.json();
     })
     .then(data => console.log(data));
   ```
2. A flag aparecerá: `FLAG{h1dd3n_3ndp01nt_m4st3r}`
3. Ou use curl:
   ```bash
   curl -I http://localhost:8000/api/ctf/easter-egg
   ```

#### Flag Difícil 🔴
1. Acesse `/home` depois de fazer login
2. Abra o console (F12 > Console)
3. Veja as dicas coloridas no console
4. Encontre a string Base64: `RkxBR3tkM2MwZDNfYjQ1MzY0X2g0cmRfbTBkM30=`
5. Decodifique:
   ```javascript
   atob('RkxBR3tkM2MwZDNfYjQ1MzY0X2g0cmRfbTBkM30=')
   ```
6. Resultado: `FLAG{d3c0d3_b45364_h4rd_m0d3}`
7. Ou use: https://www.base64decode.org/

### 4. Submeter Flags

1. Acesse `/ctf`
2. Preencha o formulário:
   - Nome: Seu Nome
   - Email: seu@email.com
   - Flag: `FLAG{...}`
3. Clique em "Submeter Flag"
4. 🎉 Confetti aparece se correto!
5. Veja sua posição em `/ctf/leaderboard`

---

## 🧪 Testes de Validação

### Testes Funcionais

✅ **Submissão válida**
- Flag correta é aceita
- Pontos são creditados
- Aparece no leaderboard

✅ **Submissão inválida**
- Flag incorreta é rejeitada
- Mensagem de erro apropriada

✅ **Limite de submissões**
- Usuário não pode submeter 2x na mesma dificuldade
- Mensagem informativa

✅ **Slots esgotados**
- Sistema verifica limite de participantes
- Rejeita quando todos os slots estão preenchidos

✅ **Leaderboard**
- Ordena por pontos
- Agrupa submissões do mesmo usuário
- Atualiza em tempo real

### Testes de Segurança

✅ **Hash de flags**
- Flags nunca são expostas em texto plano
- SHA256 é usado para validação

✅ **Validação de entrada**
- Email é validado
- Nome tem limite de caracteres
- Flag tem formato esperado

✅ **Rate limiting**
- Previne brute force (pode implementar melhorias)

---

## 📊 Estrutura de Arquivos

### Backend
```
portal-colaborador-backend/
├── app/
│   ├── models/
│   │   └── ctf.py           # Modelos SQLAlchemy
│   ├── schemas/
│   │   └── ctf.py           # Schemas Pydantic
│   ├── crud/
│   │   └── ctf.py           # Operações de banco
│   ├── api/routes/
│   │   └── ctf.py           # Endpoints REST
│   ├── core/
│   │   └── config.py        # Configurações CTF
│   └── seed.py              # Seed com flags
```

### Frontend
```
portal-colabora-lovable/
├── src/
│   ├── pages/
│   │   ├── CTF.tsx          # Página de submissão
│   │   └── CTFLeaderboard.tsx  # Ranking
│   ├── components/
│   │   ├── CTFBadge.tsx     # Badge visual
│   │   ├── CTFStats.tsx     # Estatísticas
│   │   └── ConfettiEffect.tsx  # Animação
│   ├── services/
│   │   └── ctfService.ts    # Cliente API
│   ├── hooks/
│   │   └── useCTFQueries.ts # React Query hooks
│   └── types/
│       └── index.ts         # Types CTF
```

---

## 🎨 Customização

### Adicionar Novas Flags

1. Gere o hash SHA256:
   ```python
   import hashlib
   flag = "FLAG{nova_flag}"
   hash_flag = hashlib.sha256(flag.encode()).hexdigest()
   print(hash_flag)
   ```

2. Adicione no banco:
   ```python
   # Via seed.py ou SQL direto
   INSERT INTO ctf_flags (flag_hash, difficulty, points, hint, active)
   VALUES ('hash_aqui', 'MEDIUM', 20, 'Sua dica', true);
   ```

3. Esconda a flag em algum lugar da aplicação

### Modificar Pontuação

Edite no `.env`:
```bash
CTF_EASY_POINTS=15
CTF_MEDIUM_POINTS=25
CTF_HARD_POINTS=40
```

### Alterar Slots

```bash
CTF_EASY_FLAGS=20
CTF_MEDIUM_FLAGS=10
CTF_HARD_FLAGS=5
```

---

## 🐛 Troubleshooting

**Erro: "Flag não encontrada"**
- Verifique se o seed foi executado
- Confirme que a flag está exatamente correta (case-sensitive)

**Leaderboard vazio**
- Submeta pelo menos uma flag
- Verifique se o backend está rodando

**Confetti não aparece**
- Limpe o cache do navegador
- Verifique o console por erros

---

## 🚀 Próximas Melhorias

- [ ] Sistema de hints progressivos (custo em pontos)
- [ ] Timer para competições
- [ ] Badges de achievement
- [ ] Histórico de tentativas
- [ ] Dashboard admin para gerenciar flags
- [ ] Notificações em tempo real
- [ ] Sistema de equipes

---

## 📝 Licença

Parte do Portal do Colaborador - Assert Consulting

---

**Divirta-se! 🎯🔍🎉**

