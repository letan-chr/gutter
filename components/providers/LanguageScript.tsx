export function LanguageScript({ initialLanguage }: { initialLanguage: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // Use the language from server (already set in HTML lang attribute)
              // This ensures server and client match
              const serverLang = document.documentElement.lang || '${initialLanguage}';
              const lang = (serverLang === 'en' || serverLang === 'am') ? serverLang : 'en';
              
              // Ensure HTML lang attribute matches server
              document.documentElement.lang = lang;
              
              // Sync cookie if it doesn't match
              function getCookie(name) {
                const value = "; " + document.cookie;
                const parts = value.split("; " + name + "=");
                if (parts.length === 2) return parts.pop().split(";").shift();
                return null;
              }
              
              const cookieLang = getCookie('language');
              if (cookieLang !== lang) {
                document.cookie = 'language=' + lang + '; path=/; max-age=' + (60 * 60 * 24 * 365) + '; SameSite=Lax';
              }
              
              // Sync to localStorage
              try {
                localStorage.setItem('language', lang);
              } catch (e) {
                // Ignore localStorage errors
              }
            } catch (e) {
              // Fallback to server language
              document.documentElement.lang = '${initialLanguage}';
            }
          })();
        `,
      }}
    />
  );
}

