# 🧪 Exemplos de Casos de Teste - PBC

Este documento contém **exemplos prontos** de casos de teste de segurança que podem ser usados como referência durante o workshop.

---

## 📋 Template Padrão

```gherkin
# TC-[ID] - [Nome do Teste]

**Pilar**: [Autenticação/Sessão/Autorização/Manipulação/Auditoria]
**Prioridade**: [Alta/Média/Baixa]
**Tags**: pilar=[pilar], tipo_teste=seguranca, severidade=[nivel]

## Descrição
[Breve descrição do que está sendo testado]

## Pré-condições
- [Condição 1]
- [Condição 2]

## Passos
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

## Resultado Esperado
[O que deveria acontecer]

## Resultado Atual (Vulnerabilidade)
[O que acontece na versão vulnerável]

## Evidência
[Código/Screenshot/Log]

## Impacto
[Consequências da vulnerabilidade]

## Recomendação
[Como corrigir]
```

---

## 🔐 1. Pilar: Autenticação

### TC-AUTH-001 - Aceitação de Senha Fraca

**Pilar**: Autenticação  
**Prioridade**: Alta  
**Tags**: `pilar=autenticacao`, `tipo_teste=seguranca`, `severidade=alta`

#### Descrição
Verificar se o sistema aceita senhas fracas durante o registro

#### Pré-condições
- Acesso à página de registro
- Nenhum usuário logado

#### Passos
1. Acessar `http://localhost:8080/register`
2. Preencher formulário:
   - Nome: "Teste Silva"
   - Email: "teste@empresa.com"
   - Username: "teste"
   - Senha: "123"
   - CPF: "123.456.789-00"
   - Telefone: "(11) 99999-9999"
3. Clicar em "Criar Conta"

#### Resultado Esperado
- Sistema rejeita a senha
- Exibe mensagem: "Senha deve ter no mínimo 8 caracteres, incluir letras maiúsculas, minúsculas, números e caracteres especiais"

#### Resultado Atual (Vulnerabilidade)
- ❌ Sistema **aceita** a senha fraca
- ✅ Usuário criado com sucesso

#### Evidência
```json
POST /api/auth/register
{
  "nome": "Teste Silva",
  "email": "teste@empresa.com",
  "username": "teste",
  "senha": "123",
  "cpf": "123.456.789-00",
  "telefone": "(11) 99999-9999"
}

Response: 200 OK
```

#### Impacto
- Contas vulneráveis a ataques de força bruta
- Comprometimento fácil de credenciais
- **OWASP**: A07:2021 - Identification and Authentication Failures

#### Recomendação
Implementar política de senha forte:
```python
# Backend validation
if len(password) < 8:
    raise ValueError("Senha deve ter no mínimo 8 caracteres")
if not re.search(r'[A-Z]', password):
    raise ValueError("Senha deve conter letra maiúscula")
if not re.search(r'[a-z]', password):
    raise ValueError("Senha deve conter letra minúscula")
if not re.search(r'[0-9]', password):
    raise ValueError("Senha deve conter número")
if not re.search(r'[!@#$%^&*]', password):
    raise ValueError("Senha deve conter caractere especial")
```

---

### TC-AUTH-002 - Mensagem de Erro Informativa (User Enumeration)

**Pilar**: Autenticação  
**Prioridade**: Média  
**Tags**: `pilar=autenticacao`, `tipo_teste=seguranca`, `severidade=media`

#### Descrição
Verificar se o sistema expõe informações sobre existência de usuários através de mensagens de erro

#### Pré-condições
- Acesso à página de login
- Conhecimento de um username válido (ex: "maria")

#### Passos
1. Acessar `http://localhost:8080/`
2. Tentar login:
   - Username: "maria"
   - Senha: "senhaerrada"
3. Observar mensagem de erro
4. Repetir com username inexistente:
   - Username: "usuarioinexistente"
   - Senha: "qualquer"
5. Comparar mensagens

#### Resultado Esperado
- Ambas as tentativas retornam mensagem genérica: "Credenciais inválidas"
- Impossível determinar se username existe

#### Resultado Atual (Vulnerabilidade)
- ❌ Username válido: "Senha incorreta para o usuário maria"
- ❌ Username inválido: "Usuário não encontrado"
- ✅ **Atacante pode enumerar usuários válidos**

#### Impacto
- Facilita ataques de força bruta (atacante sabe quais users são válidos)
- Exposição de informações sobre usuários do sistema
- **OWASP**: A01:2021 - Broken Access Control

#### Recomendação
```python
# Backend - sempre retornar mensagem genérica
if not user or not verify_password(password, user.password_hash):
    raise HTTPException(
        status_code=401,
        detail="Credenciais inválidas"  # Mensagem genérica
    )
```

---

## ⏱️ 2. Pilar: Sessão

### TC-SESS-001 - Token JWT sem Expiração Adequada

**Pilar**: Sessão  
**Prioridade**: Alta  
**Tags**: `pilar=sessao`, `tipo_teste=seguranca`, `severidade=alta`

#### Descrição
Verificar se tokens JWT expiram em tempo adequado

#### Pré-condições
- Usuário com credenciais válidas
- Postman ou DevTools para inspecionar token

#### Passos
1. Fazer login com "maria" / "123456"
2. Copiar token JWT do localStorage:
   ```javascript
   localStorage.getItem('access_token')
   ```
3. Decodificar token em https://jwt.io
4. Verificar claim `exp` (expiration)
5. Aguardar tempo de expiração
6. Tentar usar token expirado em requisição

#### Resultado Esperado
- Token expira em **30 minutos**
- Após expiração, requisições retornam **401 Unauthorized**

#### Resultado Atual (Vulnerabilidade)
- ❌ Token expira em **7 dias** (604800 segundos)
- ❌ Sessão fica aberta por tempo excessivo

#### Evidência
```json
// Token decodificado
{
  "sub": "1",
  "exp": 1732636800,  // 7 dias no futuro
  "iat": 1732032000
}
```

#### Impacto
- Token roubado pode ser usado por dias
- Impossível invalidar sessões comprometidas rapidamente
- **OWASP**: A07:2021 - Identification and Authentication Failures

#### Recomendação
```python
# Backend - config.py
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Ao invés de 10080 (7 dias)

# Implementar refresh tokens para sessões longas
```

---

### TC-SESS-002 - Reutilização de Token Após Logout

**Pilar**: Sessão  
**Prioridade**: Alta  
**Tags**: `pilar=sessao`, `tipo_teste=seguranca`, `severidade=alta`

#### Descrição
Verificar se tokens são invalidados após logout

#### Pré-condições
- Postman instalado
- Usuário logado

#### Passos
1. Login como "maria" / "123456"
2. Copiar token do localStorage
3. Fazer requisição bem-sucedida:
   ```
   GET /api/users/me
   Authorization: Bearer {token}
   ```
4. Fazer logout no sistema
5. Tentar reutilizar o mesmo token na mesma requisição

#### Resultado Esperado
- Após logout, token deve ser invalidado
- Requisição retorna **401 Unauthorized**

#### Resultado Atual (Vulnerabilidade)
- ❌ Token continua válido após logout
- ✅ Requisição retorna **200 OK** com dados do usuário

#### Impacto
- Logout não protege contra uso malicioso do token
- Token roubado antes do logout permanece válido
- **OWASP**: A07:2021 - Identification and Authentication Failures

#### Recomendação
```python
# Implementar blacklist de tokens
# Redis para armazenar tokens invalidados

@app.post("/api/auth/logout")
def logout(token: str = Depends(oauth2_scheme)):
    # Adicionar token à blacklist
    redis_client.setex(
        f"blacklist:{token}",
        settings.ACCESS_TOKEN_EXPIRE_SECONDS,
        "1"
    )
    return {"message": "Logout realizado"}

# Verificar blacklist em cada requisição autenticada
def get_current_user(token: str = Depends(oauth2_scheme)):
    if redis_client.exists(f"blacklist:{token}"):
        raise HTTPException(401, "Token inválido")
    # ... validação normal
```

---

## 🔓 3. Pilar: Autorização

### TC-AUTHZ-001 - IDOR em Dados de Usuários

**Pilar**: Autorização  
**Prioridade**: Crítica  
**Tags**: `pilar=autorizacao`, `tipo_teste=idor`, `severidade=critica`

#### Descrição
Verificar se colaborador pode acessar dados de outros usuários alterando ID na URL

#### Pré-condições
- Login como COLABORADOR (maria)
- Conhecimento de IDs de outros usuários

#### Passos
1. Login como "maria" / "123456" (user_id = 1)
2. Abrir DevTools → Network
3. Fazer requisição para seu próprio perfil:
   ```
   GET /api/users/1
   ```
4. Alterar ID na requisição:
   ```
   GET /api/users/2  (João Silva)
   GET /api/users/3  (Ana Admin)
   ```
5. Observar resposta

#### Resultado Esperado
- Colaborador só pode acessar seus próprios dados
- Requisições para outros IDs retornam **403 Forbidden**

#### Resultado Atual (Vulnerabilidade)
- ❌ Sistema retorna **200 OK** com dados completos do outro usuário
- ❌ Expõe: nome, email, CPF, telefone, dados bancários

#### Evidência
```json
GET /api/users/2
Authorization: Bearer {token_da_maria}

Response: 200 OK
{
  "id": 2,
  "nome": "João Silva",
  "email": "joao.silva@empresa.com.br",
  "cpf": "987.654.321-00",
  "telefone": "(11) 98765-4321",
  "dadosBancarios": {
    "banco": "Itaú",
    "agencia": "9876",
    "conta": "54321-0"
  }
}
```

#### Impacto
- Vazamento de dados pessoais (PII)
- Violação de privacidade
- Não conformidade com LGPD
- **OWASP**: A01:2021 - Broken Access Control

#### Recomendação
```python
# Backend - routes/users.py
@router.get("/{user_id}")
def get_user(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Validar autorização
    if current_user.role == "COLABORADOR" and current_user.id != user_id:
        raise HTTPException(
            status_code=403,
            detail="Você não tem permissão para acessar dados de outros usuários"
        )
    
    # ... resto do código
```

---

## 🎭 4. Pilar: Manipulação

### TC-MANIP-001 - XSS Armazenado em Mensagens

**Pilar**: Manipulação  
**Prioridade**: Crítica  
**Tags**: `pilar=manipulacao`, `tipo_teste=xss`, `severidade=critica`

#### Descrição
Verificar se sistema permite injeção de scripts em campos de mensagem

#### Pré-condições
- Login como COLABORADOR
- Acesso à página de Mensagens

#### Passos
1. Login como "maria" / "123456"
2. Ir para "Mensagens"
3. Criar nova mensagem:
   - Título: `<script>alert('XSS')</script>`
   - Conteúdo: `<img src=x onerror="alert('XSS no conteúdo')">`
4. Enviar mensagem
5. Logout
6. Login como "admin" / "admin123"
7. Ir para "Mensagens"
8. Visualizar mensagens

#### Resultado Esperado
- Scripts são sanitizados antes de salvar no banco
- Exibição mostra texto: `<script>alert('XSS')</script>` (escaped)

#### Resultado Atual (Vulnerabilidade)
- ❌ Scripts são armazenados sem sanitização
- ❌ Ao visualizar mensagem, scripts são executados
- ❌ Alert aparece na tela do admin

#### Evidência
```javascript
// Payload no título
<script>alert('XSS')</script>

// Payload no conteúdo
<img src=x onerror="alert('XSS')">
<iframe src="javascript:alert('XSS')">
```

#### Impacto
- Roubo de cookies/tokens
- Redirecionamento malicioso
- Execução de ações em nome do admin
- **OWASP**: A03:2021 - Injection

#### Recomendação
```python
# Backend - sanitizar antes de salvar
import bleach

def sanitize_html(text: str) -> str:
    allowed_tags = []  # Nenhuma tag permitida
    return bleach.clean(text, tags=allowed_tags, strip=True)

@router.post("/api/messages")
def create_message(data: MessageCreate, ...):
    data.titulo = sanitize_html(data.titulo)
    data.conteudo = sanitize_html(data.conteudo)
    # ... salvar no banco
```

```typescript
// Frontend - escapar ao renderizar
import DOMPurify from 'dompurify';

<div>{DOMPurify.sanitize(message.titulo)}</div>
```

---

### TC-MANIP-002 - Validação Apenas no Cliente

**Pilar**: Manipulação  
**Prioridade**: Alta  
**Tags**: `pilar=manipulacao`, `tipo_teste=bypass`, `severidade=alta`

#### Descrição
Verificar se validações implementadas apenas no frontend podem ser contornadas

#### Pré-condições
- Login como COLABORADOR
- Postman ou DevTools Console

#### Passos
1. Login como "maria"
2. Abrir DevTools → Console
3. Fazer requisição direta ao backend:
   ```javascript
   fetch('http://localhost:8000/api/users/me', {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('access_token')}`
     },
     body: JSON.stringify({
       email: 'email-invalido',  // Sem @
       telefone: '123'  // Formato inválido
     })
   })
   ```
4. Verificar resposta

#### Resultado Esperado
- Backend valida dados
- Retorna **422 Unprocessable Entity** com erros de validação

#### Resultado Atual (Vulnerabilidade)
- ❌ Backend aceita dados inválidos
- ✅ Retorna **200 OK**
- ❌ Dados inconsistentes salvos no banco

#### Impacto
- Dados corrompidos no banco
- Falhas em integrações que dependem do formato
- **OWASP**: A04:2021 - Insecure Design

#### Recomendação
```python
# Backend - sempre validar no servidor
from pydantic import EmailStr, validator

class UserUpdate(BaseModel):
    email: EmailStr  # Valida formato de email
    telefone: str
    
    @validator('telefone')
    def validate_phone(cls, v):
        pattern = r'^\(\d{2}\) \d{4,5}-\d{4}$'
        if not re.match(pattern, v):
            raise ValueError('Formato inválido')
        return v
```

---

## 📊 5. Pilar: Auditoria

### TC-AUDIT-001 - Ausência de Log em Alteração Sensível

**Pilar**: Auditoria  
**Prioridade**: Média  
**Tags**: `pilar=auditoria`, `tipo_teste=logging`, `severidade=media`

#### Descrição
Verificar se alterações sensíveis (dados bancários) são registradas em log

#### Pré-condições
- Login como COLABORADOR
- Login como ADMIN (para verificar logs)

#### Passos
1. Login como "maria" / "123456"
2. Ir para "Meus Dados"
3. Alterar dados bancários:
   - Banco: "Banco do Brasil"
   - Agência: "1234-5"
   - Conta: "99999-9"
4. Salvar alterações
5. Logout
6. Login como "admin" / "admin123"
7. Ir para "Logs"
8. Buscar log da alteração

#### Resultado Esperado
- Log registrado com:
  - Timestamp
  - User ID
  - Tipo: "UPDATE_BANKING_DATA"
  - Dados anteriores (mascarados)
  - Dados novos (mascarados)
  - IP de origem

#### Resultado Atual (Vulnerabilidade)
- ✅ Log genérico "UPDATE_DATA" é criado
- ❌ Falta detalhamento: quais campos foram alterados
- ❌ Não registra valores antigos/novos
- ❌ Não registra IP

#### Impacto
- Dificulta auditoria e investigação
- Impossível rastrear alterações fraudulentas
- Não conformidade com requisitos de auditoria

#### Recomendação
```python
# Backend - log detalhado
@router.put("/api/users/me")
def update_user(data: UserUpdate, current_user: User, ...):
    old_data = {
        "banco": current_user.bank_name,
        "agencia": current_user.bank_agency,
        "conta": mask_account(current_user.bank_account)
    }
    
    # Atualizar dados
    # ...
    
    # Registrar log detalhado
    log_event_crud.create(db, {
        "user_id": current_user.id,
        "event_type": "UPDATE_BANKING_DATA",
        "description": f"Dados bancários alterados",
        "ip_address": request.client.host,
        "old_value": json.dumps(old_data),
        "new_value": json.dumps({
            "banco": data.dadosBancarios.banco,
            "agencia": data.dadosBancarios.agencia,
            "conta": mask_account(data.dadosBancarios.conta)
        })
    })
```

---

## 🏷️ Sistema de Tags para Azure DevOps

### Categorização de Testes

```
# Pilar
pilar=autenticacao
pilar=sessao
pilar=autorizacao
pilar=manipulacao
pilar=auditoria

# Tipo de Teste
tipo_teste=seguranca
tipo_teste=funcional
tipo_teste=regressao
tipo_teste=integracao
tipo_teste=idor
tipo_teste=xss
tipo_teste=bypass
tipo_teste=logging

# Severidade
severidade=critica
severidade=alta
severidade=media
severidade=baixa

# OWASP Top 10
owasp=a01_broken_access_control
owasp=a02_cryptographic_failures
owasp=a03_injection
owasp=a04_insecure_design
owasp=a05_security_misconfiguration
owasp=a06_vulnerable_components
owasp=a07_identification_failures
owasp=a08_software_integrity_failures
owasp=a09_logging_failures
owasp=a10_ssrf

# Status
status=to_do
status=in_progress
status=failed
status=passed
status=blocked
```

---

## 📝 Como Usar Estes Exemplos

### No Workshop:

1. **Apresente** um caso de teste
2. **Demonstre** a exploração ao vivo
3. **Peça** aos participantes para replicarem
4. **Discuta** o impacto
5. **Mostre** a correção recomendada
6. **Crie** work item no Azure DevOps

### Como Template:

- Copie o template padrão
- Adapte para nova vulnerabilidade
- Documente evidências
- Classifique com tags apropriadas

---

## 🎯 Métricas de Cobertura

```
✅ Autenticação:    2/3 vulnerabilidades documentadas
✅ Sessão:          2/2 vulnerabilidades documentadas  
✅ Autorização:     1/2 vulnerabilidades documentadas
✅ Manipulação:     2/3 vulnerabilidades documentadas
✅ Auditoria:       1/2 vulnerabilidades documentadas

Total: 8/12 casos de teste exemplificados
```

---

**📚 Para mais exemplos, consulte:**
- [README.md - Vulnerabilidades](./README.md#-explorando-vulnerabilidades)
- [Backend VULNERABILITIES.md](https://github.com/carvalh001/portal-colaborador-backend)
- [Postman Collection](../portal-colaborador-backend/POSTMAN_GUIDE.md)

