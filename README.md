# README.md

# User Management System

Bu proje, kullanıcı yönetimi için bir sistem geliştirmek amacıyla oluşturulmuştur. Proje, Go ile yazılmış bir backend ve TypeScript ile yazılmış bir frontend içermektedir. Aşağıda, projenin bileşenleri ve kurulum talimatları yer almaktadır.

## Proje Yapısı

```
user-management-system
├── backend
│   ├── cmd
│   │   └── main.go
│   ├── internal
│   │   ├── api
│   │   │   ├── handlers
│   │   │   │   └── user_handler.go
│   │   │   └── routes
│   │   │       └── routes.go
│   │   ├── database
│   │   │   ├── db.go
│   │   │   └── sqlite.db
│   │   ├── models
│   │   │   └── user.go
│   │   └── services
│   │       └── user_service.go
│   ├── go.mod
│   └── README.md
├── frontend
│   ├── src
│   │   ├── app
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── UserGrid.tsx
│   │   │   └── UserForm.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Kurulum

### Backend

1. `backend` dizinine gidin.
2. Gerekli bağımlılıkları yüklemek için `go mod tidy` komutunu çalıştırın.
3. Sunucuyu başlatmak için `go run cmd/main.go` komutunu kullanın.

### Frontend

1. `frontend` dizinine gidin.
2. Gerekli bağımlılıkları yüklemek için `npm install` komutunu çalıştırın.
3. Uygulamayı başlatmak için `npm run dev` komutunu kullanın.

## Kullanım

- Ana görünümde tüm kullanıcıları listeleyebilir ve CRUD işlemlerini gerçekleştirebilirsiniz.
- Detaylı görünümde kullanıcı bilgilerini görüntüleyebilir ve düzenleyebilirsiniz.

## Katkıda Bulunma

Herhangi bir katkıda bulunmak isterseniz, lütfen bir pull request oluşturun.