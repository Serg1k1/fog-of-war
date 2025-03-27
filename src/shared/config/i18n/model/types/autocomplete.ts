import en from '../../../../assets/locales/en.json';

type TranslationKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? `${Prefix}${K & string}`
    : `${Prefix}${K & string}` | TranslationKeys<T[K], `${Prefix}${K & string}.`>;
}[keyof T];

export type TranslationArg = TranslationKeys<typeof en>;
