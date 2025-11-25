# Guia de Integração Frontend ↔ Backend - Portal de Benefícios do Colaborador

## ✅ Integração Completa Implementada

Este documento descreve a integração completa entre o frontend React e o backend FastAPI do Portal de Benefícios do Colaborador (PBC).

## 📋 Resumo da Integração

### O que foi implementado:

1. **Camada de Serviços API**
   - Cliente HTTP centralizado com Axios
   - Interceptors para JWT automático
   - Tratamento de erros 401 (redirecionamento para login)
   - Serviços para todas as entidades (auth, users, benefits, messages, logs)

2. **React Query Setup**
   - QueryClientProvider configurado
   - Hooks customizados para cada recurso
   - Cache estratégico e invalidação automática
   - Loading e error states gerenciados

3. **Autenticação JWT**
   - AuthContext refatorado para usar API real
   - Token armazenado em localStorage
   - Interceptor automático de Authorization header
   - Logout automático em 401

4. **Páginas Atualizadas**
   - ✅ Login - autenticação real
   - ✅ Register - cadastro real
   - ✅ Benefits - listagem com filtros
   - ✅ MyData - atualização de dados pessoais
   - ✅ Messages - envio e listagem de mensagens
   - ✅ Employees - listagem de colaboradores (admin)
   - ✅ EmployeeDetail - detalhes do colaborador
   - ✅ Users - gestão de usuários e papéis (admin)
   - ✅ Logs - visualização de logs (admin)

5. **Componentes de UI**
   - ErrorBoundary - captura erros globais
   - ErrorDisplay - exibição amigável de erros
   - LoadingSkeleton - skeletons para loading states

## 🚀 Como Rodar

### 1. Backend (FastAPI)

```bash
cd portal-colaborador-backend
docker-compose up --build
```

O backend estará disponível em: `http://localhost:8000`
Documentação da API: `http://localhost:8000/docs`

### 2. Frontend (React)

```bash
cd portal-colabora-lovable
bun install  # ou npm install
bun run dev  # ou npm run dev
```

O frontend estará disponível em: `http://localhost:8080`

## 🔑 Usuários de Teste

O backend já vem com dados de seed. Você pode fazer login com:

### Colaborador
- **Username:** maria
- **Senha:** 123456

### Gestor RH
- **Username:** joao
- **Senha:** 123456

### Admin
- **Username:** admin
- **Senha:** admin123

## 📂 Estrutura de Arquivos Criados/Modificados

### Frontend

```
portal-colabora-lovable/
├── .env.local (novo) - variáveis de ambiente
├── src/
│   ├── services/ (novo)
│   │   ├── api.ts - cliente HTTP Axios
│   │   ├── authService.ts - autenticação
│   │   ├── userService.ts - usuários
│   │   ├── benefitService.ts - benefícios
│   │   ├── messageService.ts - mensagens
│   │   └── logService.ts - logs
│   ├── hooks/ (novos)
│   │   ├── useAuthQueries.ts - hooks de autenticação
│   │   ├── useUserQueries.ts - hooks de usuários
│   │   ├── useBenefitQueries.ts - hooks de benefícios
│   │   ├── useMessageQueries.ts - hooks de mensagens
│   │   └── useLogQueries.ts - hooks de logs
│   ├── components/ (novos)
│   │   ├── ErrorBoundary.tsx - error boundary
│   │   ├── ErrorDisplay.tsx - exibição de erros
│   │   └── LoadingSkeleton.tsx - loading skeletons
│   ├── contexts/
│   │   └── AuthContext.tsx (refatorado) - contexto de autenticação com JWT
│   ├── types/
│   │   └── index.ts (modificado) - id alterado de string para number
│   └── pages/ (todos modificados)
│       ├── Login.tsx - login com API real
│       ├── Register.tsx - cadastro com API real
│       ├── Benefits.tsx - benefícios da API
│       ├── MyData.tsx - atualização via API
│       ├── Messages.tsx - mensagens da API
│       └── admin/
│           ├── Employees.tsx - colaboradores da API
│           ├── EmployeeDetail.tsx - detalhes da API
│           ├── Users.tsx - gestão de usuários
│           └── Logs.tsx - logs da API
```

## 🔧 Configuração

### Variáveis de Ambiente

Arquivo: `portal-colabora-lovable/.env.local`

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### CORS no Backend

O backend já está configurado para aceitar requisições de:
- `http://localhost:5173`
- `http://localhost:8080`
- `http://localhost:3000`

Configurado em: `portal-colaborador-backend/docker-compose.yml`

## 🎯 Features Implementadas

### Autenticação
- ✅ Login com username/email + senha
- ✅ Registro de novos usuários
- ✅ JWT armazenado em localStorage
- ✅ Logout com limpeza de token
- ✅ Redirecionamento automático em 401

### Autorização (RBAC)
- ✅ Papéis: COLABORADOR, GESTOR_RH, ADMIN
- ✅ Proteção de rotas por papel
- ✅ ProtectedRoute component
- ✅ Verificação de permissões no AuthContext

### Benefícios
- ✅ Listagem de benefícios do usuário autenticado
- ✅ Filtros por categoria e busca
- ✅ Loading states
- ✅ Error handling

### Dados Pessoais
- ✅ Visualização de dados pessoais
- ✅ Edição de email, telefone, dados bancários
- ✅ Feedback de sucesso/erro
- ✅ Loading durante salvamento

### Mensagens
- ✅ Envio de mensagens para RH
- ✅ Histórico de mensagens
- ✅ Status das mensagens
- ✅ Invalidação de cache após criar

### Admin - Colaboradores
- ✅ Listagem de colaboradores
- ✅ Filtros por nome e status
- ✅ Visualização de detalhes
- ✅ Benefícios do colaborador
- ✅ Mensagens do colaborador

### Admin - Usuários
- ✅ Listagem de todos os usuários
- ✅ Alteração de papéis (RBAC)
- ✅ Busca por nome/email/username
- ✅ Feedback visual de mudanças

### Admin - Logs
- ✅ Visualização de logs de eventos
- ✅ Filtros por tipo de evento e usuário
- ✅ Exibição formatada de data/hora

## 🧪 Testando a Integração

### 1. Teste de Login
1. Acesse `http://localhost:8080/login`
2. Entre com `maria` / `123456`
3. Verifique redirecionamento para `/home`
4. Abra DevTools → Application → Local Storage
5. Confirme que `accessToken` está presente

### 2. Teste de Benefícios
1. Logado como Maria, vá em "Benefícios"
2. Verifique que os benefícios são carregados da API
3. Teste os filtros de categoria
4. Teste a busca por nome

### 3. Teste de Atualização de Dados
1. Vá em "Meus Dados"
2. Altere telefone ou email
3. Clique em "Salvar Alterações"
4. Verifique toast de sucesso
5. Recarregue a página e confirme que os dados persistiram

### 4. Teste de Mensagens
1. Vá em "Mensagens"
2. Envie uma nova mensagem
3. Verifique que aparece no histórico
4. Verifique toast de sucesso

### 5. Teste de Admin
1. Logout e login como `admin` / `admin123`
2. Vá em "Colaboradores" (menu admin)
3. Clique para ver detalhes de um colaborador
4. Vá em "Usuários e papéis"
5. Altere o papel de um usuário
6. Vá em "Logs" e veja os eventos registrados

### 6. Teste de RBAC
1. Logado como Maria (COLABORADOR)
2. Tente acessar `/admin/colaboradores` direto pela URL
3. Deve ser redirecionado para `/access-denied`

## 🐛 Tratamento de Erros

### Tipos de Erro Tratados

1. **401 Unauthorized**
   - Token inválido ou expirado
   - Redireciona automaticamente para `/login`
   - Limpa localStorage

2. **403 Forbidden**
   - Acesso negado por permissão
   - Redireciona para `/access-denied`

3. **Network Error**
   - Servidor indisponível
   - Exibe mensagem amigável
   - Botão de retry quando disponível

4. **500 Server Error**
   - Erro interno do servidor
   - Exibe mensagem genérica
   - Não expõe detalhes técnicos

### ErrorBoundary

Captura erros não tratados de React e exibe UI de fallback:

```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 🔒 Segurança

### Boas Práticas Implementadas

- ✅ JWT em Authorization header
- ✅ Token não exposto em console.log
- ✅ Limpeza de token ao logout
- ✅ Interceptor global de 401
- ✅ CORS configurado corretamente
- ✅ Validações no frontend e backend

### Vulnerabilidades Intencionais (para workshop)

Como este é um projeto didático, algumas vulnerabilidades foram mantidas propositalmente:

- Token em localStorage (vulnerável a XSS)
- Senhas fracas aceitas
- Mensagens de erro informativas
- Token com longa expiração
- Sem rate limiting
- Sem CSRF protection

**Nota:** Estas vulnerabilidades são para fins educacionais no workshop de segurança.

## 📊 React Query

### Configuração

```tsx
const queryClient = new QueryClient();
```

### Hooks Customizados

Todos os hooks seguem o padrão React Query:

```tsx
// Query (GET)
const { data, isLoading, error } = useBenefits();

// Mutation (POST/PUT/PATCH)
const mutation = useCreateMessage();
await mutation.mutateAsync(data);
```

### Cache e Invalidação

React Query gerencia cache automaticamente. As invalidações são configuradas nas mutations:

```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["messages"] });
}
```

## 🎨 Loading States

### Skeletons

Todos os componentes têm loading states com Skeleton:

```tsx
{isLoading ? (
  <Skeleton className="h-12 w-full" />
) : (
  <RealContent />
)}
```

### Loading Indicators

Botões com ações assíncronas mostram feedback:

```tsx
<Button disabled={mutation.isPending}>
  {mutation.isPending ? (
    <>
      <Loader2 className="animate-spin" />
      Salvando...
    </>
  ) : (
    "Salvar"
  )}
</Button>
```

## 📝 Próximos Passos (Opcional)

Melhorias que podem ser implementadas:

1. **Refresh Token**
   - Implementar renovação automática de token
   - Evitar logout abrupto

2. **Optimistic Updates**
   - Atualizações otimistas em mutations
   - Melhor UX

3. **Pagination**
   - Implementar paginação em listas grandes
   - Infinite scroll

4. **Cache Prefetching**
   - Prefetch de dados ao hover
   - Navegação mais rápida

5. **Service Worker**
   - Cache de assets
   - Modo offline básico

6. **E2E Tests**
   - Testes com Playwright/Cypress
   - Cobertura de fluxos críticos

## 🆘 Troubleshooting

### Backend não inicia

```bash
cd portal-colaborador-backend
docker-compose down -v
docker-compose up --build
```

### Frontend não conecta

1. Verifique se backend está rodando: `http://localhost:8000/docs`
2. Verifique `.env.local`: `VITE_API_BASE_URL=http://localhost:8000/api`
3. Limpe cache do navegador
4. Verifique console do navegador para erros de CORS

### Token inválido

1. Limpe localStorage
2. Faça login novamente
3. Verifique se backend está rodando

### Erro 401 contínuo

1. Logout
2. Limpe localStorage
3. Reinicie backend
4. Faça login novamente

## 📚 Documentação Adicional

- [Backend README](../portal-colaborador-backend/README.md)
- [API Documentation](http://localhost:8000/docs) (quando backend estiver rodando)
- [Vulnerabilities Guide](../portal-colaborador-backend/VULNERABILITIES.md)
- [Testing Guide](../portal-colaborador-backend/TESTING.md)

## 🎉 Conclusão

A integração completa entre frontend e backend está implementada e funcional. Todos os fluxos principais estão conectados à API real, com tratamento de erros, loading states e feedback visual apropriado.

O sistema está pronto para ser usado em workshops de QA e Segurança, demonstrando tanto boas práticas quanto vulnerabilidades intencionais para fins didáticos.

