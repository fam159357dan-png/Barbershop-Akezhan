/*
 * Контент сайта. Всё, что нужно менять владельцу, лежит здесь.
 * Источник данных: Instagram @akezhan_barbershop, карточка 2GIS (https://2gis.kz/petropavlovsk/firm/70000001061069937).
 */
window.SITE = {
  phone: "77076857208",

  // Цена null показывается как «уточняйте».
  services: [
    { id: "men", name: "Мужская стрижка", desc: "Консультация, стрижка, укладка", price: 3500, from: true },
    { id: "kids", name: "Детская стрижка", desc: "Аккуратно и без спешки", price: null }
  ],

  // photo: путь к фото мастера, например "assets/team/sayat.jpg". Пока фото нет, показываются инициалы.
  team: [
    { name: "Акежан", role: "Барбер · 2 место Asian Global Cup 2025", instagram: "akezhan.barber", photo: "assets/frames/cup-2025-4.jpg" },
    { name: "Саят", role: "Барбер", instagram: "sa.yat087", photo: null },
    { name: "Асет", role: "Барбер", instagram: null, photo: null },
    { name: "Али", role: "Барбер", instagram: null, photo: null },
    { name: "Әділет", role: "Барбер", instagram: null, photo: null },
    { name: "Камила", role: "Мастер", instagram: null, photo: null }
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
  slotMinutes: 60
};
