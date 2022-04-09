enum rules {
  isNull,
  isLess4Chars,
  isLess8Chars,
  isLess10Chars,
  isMore15Chars,
  isMore20Chars,
  isMore40Chars,
  isEmail,
  isPhone,
  isFirstCapital,
  isLetterCapital,
  isOnlyNumber,
  isSpace,
  isLogin,
  isName,
  isCyrillic,
  isHasNumber,
}

interface TypeMethod {
  fn: (value: string) => boolean
  error: string
}

type TypeValidateMethod = { [T in keyof typeof rules]: TypeMethod }

const validateMethod: TypeValidateMethod = {
  isNull: {
    fn: value => !value,
    error: 'Обязательное поле',
  },
  isLess4Chars: {
    fn: value => value.length < 4,
    error: 'Не может быть меньше 4 символов',
  },
  isLess8Chars: {
    fn: value => value.length < 8,
    error: 'Не может быть меньше 8 символов',
  },
  isLess10Chars: {
    fn: value => value.length < 10,
    error: 'Не может быть меньше 8 символов',
  },
  isMore20Chars: {
    fn: value => value.length > 20,
    error: 'не может быть больше 20 символов',
  },
  isMore40Chars: {
    fn: value => value.length > 40,
    error: 'не может быть больше 40 символов',
  },
  isMore15Chars: {
    fn: value => value.length > 15,
    error: 'не может быть больше 40 символов',
  },
  isOnlyNumber: {
    fn: value => /^\d+$/.test(value),
    error: 'Не может содержать только цифры',
  },
  isSpace: {
    fn: value => /\s/.test(value),
    error: 'Не может содержать пробел',
  },
  isLogin: {
    fn: value => /[^a-zA-Zа-яА-Я0-9\-_]+/.test(value),
    error: 'Не может содержать спецсимволы, кроме - _',
  },
  isName: {
    fn: value => /[^a-zA-Zа-яА-Я0-9\-]+/.test(value),
    error: 'Не может содержать спецсимволы, кроме -',
  },
  isCyrillic: {
    fn: value => /[а-яА-Я]/.test(value),
    error: 'Не может содержать кириллицу',
  },
  isFirstCapital: {
    fn: value => !/^[A-ZА-Я]/.test(value),
    error: 'Первая буква должна быть заглавной',
  },
  isLetterCapital: {
    fn: value => !/[A-ZА-Я]/.test(value),
    error: 'Должна быть минимум 1 заглавная',
  },
  isHasNumber: {
    fn: value => /[0-9]+/.test(value),
    error: 'Не должно содержать цифры',
  },
  isPhone: {
    fn: value => !/^\+?\d+$/.test(value),
    error: 'Только цифры, может начинаться с +',
  },
  isEmail: {
    fn: value => !/\S+@\S+\.\S+/.test(value),
    error: 'Некорректный email',
  },
}

export const rulesCollection: Record<string, Array<keyof typeof rules>> = {
  login: [
    'isNull',
    'isLess4Chars',
    'isMore20Chars',
    'isOnlyNumber',
    'isSpace',
    'isLogin',
    'isCyrillic',
  ],
  password: ['isLess8Chars', 'isMore40Chars', 'isLetterCapital'],
  name: ['isFirstCapital', 'isSpace', 'isHasNumber', 'isName'],
  phone: ['isPhone', 'isLess10Chars', 'isMore15Chars'],
  email: ['isCyrillic', 'isEmail'],
}

type TypeIsValid = (value: string, rule: Array<keyof typeof rules>) => string
const validate: TypeIsValid = (value, rules) => {
  let errorMessage = ''
  rules.forEach(rule => {
    if (errorMessage) {
      return
    }
    const { fn, error } = validateMethod[rule]
    if (fn(value)) {
      errorMessage = error
    }
  })
  return errorMessage
}

export default validate
