# Görev Defteri (React TODO Uygulaması)

Web Geliştirme eğitimi proje ödevi. React, TypeScript, Vite ve Tailwind CSS ile yapılmış, verileri LocalStorage'da saklayan bir görev yönetim uygulamasıdır.

## Özellikler
- Görev **ekleme** (başlık + açıklama)
- Görevleri **listeleme** (Tümü / Devam eden / Tamamlanan filtresi)
- Görev **güncelleme** (düzenleme ve tamamlandı işaretleme)
- Görev **silme** (tekil ve tamamlananları toplu silme)
- Veriler LocalStorage'da saklanır, sayfa yenilense de kaybolmaz

## Teknolojiler
React 18, TypeScript, Vite, Tailwind CSS 3

## Klasör Yapısı
```
src/
├── components/   # TodoForm, TodoList, TodoItem, FilterBar
├── pages/        # HomePage
├── interfaces/   # Todo tipi
├── hooks/        # useTodos (CRUD mantığı)
└── utils/        # storage (LocalStorage)
```

## Kurulum
```
npm install
npm run dev
```

## Yayın
Netlify üzerinden yayına alınmıştır. Build komutu: `npm run build`, yayın klasörü: `dist`.
