/*
 * Контент сайта. Всё, что нужно менять владельцу, лежит здесь.
 * Источник данных: Instagram @akezhan_barbershop, карточка 2GIS (https://2gis.kz/petropavlovsk/firm/70000001061069937).
 */
window.SITE = {
  phone: "77076857208",

  // Прайс-лист барбершопа (в тенге). to — верхняя граница диапазона, tag — пометка, note — пояснение,
  // duration — длительность в минутах (для записи и будущей CRM; нет поля — время уточняет мастер).
  services: [
    { id: "men", group: "Стрижки", name: "Мужская стрижка", price: 5000, duration: 30 },
    { id: "student", group: "Стрижки", name: "Студентам и школьникам", price: 3500, tag: "скидка", duration: 30 },
    { id: "kids", group: "Стрижки", name: "Детская стрижка", note: "До 12 лет", price: 3000, duration: 30 },
    { id: "tattoo", group: "Стрижки", name: "Hair tattoo", price: 500, to: 1000 },

    { id: "beard", group: "Борода", name: "Оформление бороды", price: 3000, duration: 30 },
    { id: "beard-camo", group: "Борода", name: "Камуфляж бороды", price: 2500 },

    { id: "combo-beard", group: "Комплексы", name: "Стрижка + борода", price: 7000, tag: "выгода 1 000 ₸", duration: 60 },
    { id: "combo-camo", group: "Комплексы", name: "Стрижка + камуфляж волос", price: 10000, duration: 90 },
    { id: "combo-care", group: "Комплексы", name: "Стрижка + маска + ваксинг", price: 10000, duration: 60 },

    { id: "styling", group: "Уход и стиль", name: "Укладка", price: 1500 },
    { id: "wax", group: "Уход и стиль", name: "Ваксинг", note: "Удаление волос из носа и ушей, одна зона", price: 1000 },
    { id: "mask", group: "Уход и стиль", name: "Маска для лица", note: "Глина", price: 1500 },
    { id: "facial", group: "Уход и стиль", name: "Чистка лица", note: "С брендом «Kristina»", price: 6000, duration: 30 },

    // Услуги у Акежана (master) — показываются отдельной карточкой masterCard, мастер в записи подставляется сам.
    { id: "ak-men", master: "Акежан", name: "Мужская стрижка", price: 6000, duration: 60 },
    { id: "ak-student", master: "Акежан", name: "Студентам и школьникам", price: 5000, tag: "скидка", duration: 60 },
    { id: "ak-combo", master: "Акежан", name: "Стрижка + борода", price: 8000, duration: 60 },
    { id: "ak-kids", master: "Акежан", name: "Детская стрижка", note: "До 12 лет", price: 4000, duration: 30 }
  ],

  masterCard: { name: "Акежан", title: "Основатель и главный барбер", note: "Призёр Asian Global Cup 2025", photo: "assets/frames/cup-2025-4.jpg" },

  // photo: путь к фото мастера, например "assets/team/sayat.jpg". Пока фото нет, показываются инициалы.
  team: [
    { name: "Акежан", role: "Основатель и главный барбер", instagram: "akezhan.barber", photo: "assets/frames/cup-2025-4.jpg" },
    { name: "Саят", role: "Барбер", instagram: "sa.yat087", photo: null },
    { name: "Сулеймен", role: "Барбер", instagram: null, photo: null },
    { name: "Али", role: "Барбер", instagram: null, photo: null },
    { name: "Әділет", role: "Барбер", instagram: null, photo: null }
  ],

  // Кадры для бегущей ленты (вырезаны из роликов Instagram).
  frames: [
    { src: "assets/frames/beard-3.jpg", alt: "Стрижка в Akezhan Barbershop" },
    { src: "assets/frames/cup-2025-4.jpg", alt: "Акежан с кубком Asian Global Cup 2025" },
    { src: "assets/frames/dry-shave-12.jpg", alt: "Кресло и барбер-пилон" },
    { src: "assets/frames/interior-64.jpg", alt: "Полки с косметикой" },
    { src: "assets/frames/beard-22.jpg", alt: "Мастер за работой" },
    { src: "assets/frames/dry-shave-3.jpg", alt: "Зона ожидания" },
    { src: "assets/frames/beard-12.jpg", alt: "Стрижка ножницами" },
    { src: "assets/frames/cup-2025-8.jpg", alt: "Награждение" },
    { src: "assets/frames/interior-44.jpg", alt: "У стойки барбершопа" }
  ],

  // Фото работ: положите файлы в assets/gallery/ и перечислите их здесь,
  // например { src: "assets/gallery/01.jpg", caption: "Кроп с фейдом" }.
  // Видео: { video: "assets/gallery/01.mp4", poster: "assets/gallery/01.jpg", caption: "..." }.
  gallery: [
    { video: "assets/gallery/cup-2025.mp4", caption: "Акежан — 2 место на Asian Global Cup 2025, Алматы" },
    { video: "assets/gallery/dry-shave.mp4", caption: "Добро пожаловать в Akezhan" },
    { video: "assets/gallery/interior.mp4", caption: "Атмосфера барбершопа" },
    { video: "assets/gallery/beard.mp4", caption: "Стрижка в работе" },
    { src: "assets/frames/beard-22.jpg", caption: "Мастер за работой" },
    { src: "assets/frames/interior-64.jpg", caption: "Стойка и косметика" },
    { src: "assets/frames/cup-2025-8.jpg", caption: "Asian Global Cup 2025" },
    { src: "assets/frames/dry-shave-12.jpg", caption: "Кресло барбера" }
  ],

  // Отзывы клиентов из 2GIS.
  reviews: [
    { author: "Диас Назымбек", text: "Парикмахерская Акежан отличная. Я в эту парикмахерскую уже хожу 4 года." },
    { author: "Расул Макажанов", text: "Чёткий барбершоп, уютно, мастера знают своё дело." },
    { author: "Диас Майкин", text: "Акежан — лучший барбер! Хожу только к нему." },
    { author: "Miras Ebishev", text: "Лучший барбершоп в Петропавловске." },
    { author: "Ars 🦁", text: "Очень доволен работой, всё сделали аккуратно и стильно." },
    { author: "Madi 🌙", text: "Мастер всё исправил, придал стрижке форму и стиль." },
    { author: "Evgeniy Moor", text: "Сам по себе барбершоп оставляет только положительные эмоции." },
    { author: "Дияр Ергалиев", text: "Тема всё расскажет и покажет, как будет." },
    { author: "Нұрасыл Рақымжанұлы", text: "Лучший барбершоп в нашем городе." },
    { author: "Medet Oshakti", text: "Самый лучший барбершоп!" }
  ],

  hours: { open: 10, close: 20, utcOffset: 5 }, // Петропавловск, UTC+5
  slotMinutes: 30, // шаг записи — как в CRM

  // Связь с CRM (Supabase). Пустые url/key — сайт не пишет заявки в базу и просто открывает WhatsApp.
  // Заполняются после создания базы: url вида https://xxxx.supabase.co, key — публичный (publishable) ключ.
  crm: { url: "", key: "", location: "Абая 40" }
};
