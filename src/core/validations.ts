
export function validationName(str: string): string {
    if (!RegExp(/^[A-ZА-Я]{1}/).test(str)) {
        return "Первый символ должен начинается с заглавной буквы."
    } else  if (!RegExp(/^[A-ZА-Яa-zа-я-]+/).test(str)) {
        return "Поле может состоять только из букв и сиволоа '-'"
    }
    return ''
}

export function validationEmail(str: string): string {
    if (!RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(str)) {
        return "Неправильно введен email."
    }
    return ''
}

export function validationLogin(str: string): string {debugger;
    return str.length < 3 ? `Длина поля должна быть больше 3-х символов` : ''
}

export function validationPassword(str: string): string {
    if (!RegExp(/(?=.*[0-9])/).test(str)) {
        return 'Пароль должен содержать хотя бы одно число.'
    } else if (!RegExp(/(?=.*[a-zA-Z])/).test(str)) {
        return 'Пароль должен содержать хотя бы одну латинскую букву.'
    } else if (!RegExp(/[0-9a-zA-Z!@#$%^&*]{8,40}/)) {
        return 'Пароль должен состоять не менее, чем из 8 и не более 40 символов.'
    }
    return '';
}

export function validationPhone(str: string) {
    if (!RegExp(/(?=.*[+])/).test(str)) {
        return 'Телефон должен начинаться с символа "+".'
    } else if (!RegExp(/[0-9-\s()]{10,15}/).test(str)) {
        return 'Телефон должен иметь от 10 до 15 символов.'
    }
    return '';
}
