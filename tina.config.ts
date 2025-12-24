            import { defineConfig } from 'tinacms';

            export default defineConfig({
              branch: 'main',
              clientId: '85f6c700-eb01-44e2-a21d-c7a2c991216b',
              token: '1074ec10dbf0001b758402be19f6f99e7f5a5a54',
              build: {
                publicFolder: "public",
                outputFolder: "admin",
              },
              media: {
                tina: {
                  mediaRoot: "public/img",
                  publicFolder: "public",
                },
              },
              schema: {
                collections: [
                    {
                      name: "news",
                      label: "Новости",
                      path: "content/news.json",
                      format: "json",
                      fields: [
                        { name: "id", label: "ID", type: "string" },
                        { name: "date", label: "Дата", type: "string" },
                        { name: "title", label: "Заголовок", type: "string" },
                        { name: "excerpt", label: "Анонс", type: "string" },
                        { name: "image", label: "Картинка", type: "string" },
                        { name: "fullContent", label: "Текст", type: "string" },
                      ],
                    },
                    {
                      name: "header",
                      label: "Шапка сайта",
                      path: "content/header.json",
                      format: "json",
                      fields: [
                        { name: "logo", label: "Логотип", type: "string" },
                        {
                          name: "menu",
                          label: "Меню",
                          type: "object",
                          list: true,
                          fields: [
                            { name: "label", label: "Название", type: "string" },
                            { name: "href", label: "Ссылка", type: "string" },
                          ],
                        },
                        { name: "phone", label: "Телефон", type: "string" },
                        { name: "address", label: "Адрес", type: "string" },
                      ],
                    },
                    {
                      name: "hero",
                      label: "Hero-секция",
                      path: "content/hero.json",
                      format: "json",
                      fields: [
                        { name: "title", label: "Заголовок", type: "string" },
                        { name: "subtitle", label: "Подзаголовок", type: "string" },
                        { name: "backgroundImage", label: "Фоновое изображение", type: "string" },
                        { name: "ctaText", label: "Текст кнопки", type: "string" },
                        { name: "ctaLink", label: "Ссылка кнопки", type: "string" },
                      ],
                    },
                    {
                      name: "products",
                      label: "Продукты",
                      path: "content/products.json",
                      format: "json",
                      fields: [
                        { name: "id", label: "ID", type: "string" },
                        { name: "title", label: "Название", type: "string" },
                        { name: "subtitle", label: "Подзаголовок", type: "string" },
                        { name: "description", label: "Описание", type: "string" },
                        { name: "ingredients", label: "Состав", type: "string" },
                        { name: "weight", label: "Вес (г)", type: "string" },
                        { name: "image", label: "Картинка", type: "string" },
                        { name: "product_photo", label: "Фото продукта (объект)", type: "object", fields: [
                          { name: "url", label: "URL", type: "string" }
                        ] },
                        { name: "price", label: "Цена", type: "string" },
                      ],
                    },
                    {
                      name: "about",
                      label: "О нас",
                      path: "content/about.json",
                      format: "json",
                      fields: [
                        { name: "title", label: "Заголовок", type: "string" },
                        { name: "text", label: "Текст", type: "string" },
                        { name: "image", label: "Картинка", type: "string" },
                      ],
                    },
                    {
                      name: "mission",
                      label: "Миссия",
                      path: "content/mission.json",
                      format: "json",
                      fields: [
                        { name: "title", label: "Заголовок", type: "string" },
                        { name: "text", label: "Текст", type: "string" },
                        { name: "image", label: "Картинка", type: "string" },
                      ],
                    },
                    {
                      name: "footer",
                      label: "Футер",
                      path: "content/footer.json",
                      format: "json",
                      fields: [
                        { name: "text", label: "Текст", type: "string" },
                        {
                          name: "links",
                          label: "Ссылки",
                          type: "object",
                          list: true,
                          fields: [
                            { name: "label", label: "Название", type: "string" },
                            { name: "href", label: "Ссылка", type: "string" },
                          ],
                        },
                      ],
                    },
                    {
                      name: "site",
                      label: "Настройки сайта",
                      path: "content/site.json",
                      format: "json",
                      fields: [
                        { name: "title", label: "Заголовок сайта", type: "string" },
                        { name: "description", label: "Описание", type: "string" },
                        {
                          name: "seo",
                          label: "SEO",
                          type: "object",
                          fields: [
                            { name: "keywords", label: "Ключевые слова", type: "string" },
                            { name: "ogImage", label: "OG-изображение", type: "string" },
                          ],
                        },
                        {
                          name: "contacts",
                          label: "Контакты",
                          type: "object",
                          fields: [
                            { name: "phone", label: "Телефон", type: "string" },
                            { name: "email", label: "Email", type: "string" },
                            { name: "address", label: "Адрес", type: "string" },
                          ],
                        },
                      ],
                    },
    ],
  },
});
