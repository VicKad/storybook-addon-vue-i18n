import { Language } from './Language'

export interface I18nAddonParameter {
    defaultLanguage: string;
    languages: Array<Language>;
    onLocaleChange?: Function;
}
