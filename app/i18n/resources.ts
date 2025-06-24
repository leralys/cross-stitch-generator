// Translation resources organized by language
export const resources = {
  en: {
    translation: {
      // App
      appName: 'Cross Stitch Pattern Generator',
      appNameShort: 'Cross Stitch Patterns',
      appDescription: 'Generate beautiful cross stitch patterns from images',

      // --- Components ---

      // Theme
      theme: {
        toggle: 'Toggle theme',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme',
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },

      // Language
      language: {
        select: 'Select language',
        english: 'English',
        russian: 'Русский',
        current: 'Current language: {{language}}',
      },

      // File upload
      fileUpload: {
        formats: 'Supports {{formats}}',
        maxSize: 'Max size: {{maxSize}}',
        dropImageHere: 'Drop your image here',
        dropFileHere: 'Drop your file here',
        uploadFile: 'Upload a file',
        uploadImage: 'Upload an image',
        changeFile: 'Click to change file or drag a new one',
        changeImage: 'Click to change image or drag a new one',
        dragDropFile: 'Drag and drop a file, or click to select',
        dragDropImage: 'Drag and drop an image file, or click to select',
        fileUploadError: 'Failed to upload file',
        invalidFile: 'Invalid file format',
        fileTooLarge: 'File size must be less than {{maxSize}}',
        allowedFormats: 'Wrong file format, only {{formats}} are allowed',
        uploaded: 'File uploaded successfully!',
        uploading: 'Uploading file...',
      },

      // --- Common actions ---
      actions: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        create: 'Create',
        upload: 'Upload',
        download: 'Download',
        share: 'Share',
        copy: 'Copy',
        close: 'Close',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        confirm: 'Confirm',
        retry: 'Retry',
        or: 'or',
      },

      // --- Pages ---

      welcome: {
        // Hero Section
        hero: {
          scrollToStart: 'Or scroll down to get started',
        },
        // Upload Section
        uploadSection: {
          title: 'Upload Your File',
          description: 'Choose a file to convert into a cross stitch pattern',
          createCustom: 'Create Custom Pattern',
        },
      },

      // --- Errors ---
      errors: {
        generic: 'An unexpected error occurred',
        notFound: 'Page not found',
        networkError: 'Network error. Please check your connection.',
      },

      // --- Success messages ---
      success: {
        copied: 'Copied to clipboard',
      },

      // --- PWA ---
      pwa: {
        installPrompt: 'Install App',
        installDescription:
          'Install this app on your device for a better experience',
        installButton: 'Install',
        dismissButton: 'Not now',
        updateAvailable: 'Update available',
        updateDescription: 'A new version is available',
        updateButton: 'Update',
      },
    },
  },
  ru: {
    translation: {
      // App
      appNameShort: 'Схемы для вышивки',
      appName: 'Создание схем для вышивки крестиком',
      appDescription:
        'Создавайте красивые схемы для вышивки крестиком из изображений',

      // --- Components ---

      // Theme
      theme: {
        toggle: 'Переключить тему',
        switchToLight: 'Переключить на светлую тему',
        switchToDark: 'Переключить на тёмную тему',
        light: 'Светлая',
        dark: 'Тёмная',
        system: 'Системная',
      },

      // Language
      language: {
        select: 'Выбрать язык',
        english: 'English',
        russian: 'Русский',
        current: 'Текущий язык: {{language}}',
      },

      // File upload
      fileUpload: {
        formats: 'Поддерживаются {{formats}}',
        maxSize: 'Максимальный размер: {{maxSize}}',
        dropImageHere: 'Перетащите изображение сюда',
        dropFileHere: 'Перетащите файл сюда',
        uploadFile: 'Загрузить файл',
        uploadImage: 'Загрузить изображение',
        changeFile: 'Нажмите для замены файла или перетащите новый',
        changeImage: 'Нажмите для замены изображения или перетащите новый файл',
        dragDropFile: 'Перетащите файл или нажмите для выбора',
        dragDropImage: 'Перетащите изображение или нажмите для выбора',
        fileUploadError: 'Не удалось загрузить файл',
        invalidFile: 'Неверный формат файла',
        fileTooLarge: 'Размер файла должен быть меньше {{maxSize}}',
        allowedFormats: 'Неверный формат файла, допустимы только {{formats}}',
        uploaded: 'Файл успешно загружен!',
        uploading: 'Загрузка файла...',
      },

      // --- Common actions ---
      actions: {
        save: 'Сохранить',
        cancel: 'Отмена',
        delete: 'Удалить',
        edit: 'Редактировать',
        create: 'Создать',
        upload: 'Загрузить',
        download: 'Скачать',
        share: 'Поделиться',
        copy: 'Копировать',
        close: 'Закрыть',
        back: 'Назад',
        next: 'Далее',
        previous: 'Предыдущий',
        confirm: 'Подтвердить',
        retry: 'Повторить',
        or: 'или',
      },

      // --- Pages ---
      welcome: {
        // Hero Section
        hero: {
          scrollToStart: 'Или пролистайте вниз, чтобы начать',
        },
        // Upload Section
        uploadSection: {
          title: 'Загрузите ваш файл',
          description: 'Выберите файл для создания схемы вышивки крестиком',
          createCustom: 'Создать собственную схему',
        },
      },

      // --- Errors ---
      errors: {
        generic: 'Произошла неожиданная ошибка',
        notFound: 'Страница не найдена',
        networkError: 'Ошибка сети. Проверьте подключение к интернету.',
      },

      // --- Success messages ---
      success: {
        copied: 'Скопировано в буфер обмена',
      },

      // --- PWA ---
      pwa: {
        installPrompt: 'Установить приложение',
        installDescription:
          'Установите это приложение на устройство для лучшего опыта',
        installButton: 'Установить',
        dismissButton: 'Не сейчас',
        updateAvailable: 'Доступно обновление',
        updateDescription: 'Доступна новая версия',
        updateButton: 'Обновить',
      },
    },
  },
};
