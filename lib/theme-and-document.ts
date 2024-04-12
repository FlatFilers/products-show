import * as plmThemes from "@/lib/themes/themes";
import * as plmDocuments from "@/lib/documents/documents";
import { DocumentConfig } from "@flatfile/api/api";

interface Theme {
  root: {
    primaryColor: string;
    warningColor: string;
  };
  sidebar: {
    logo: string;
    textColor: string;
    titleColor: string;
    focusBgColor: string;
    focusTextColor: string;
    backgroundColor: string;
    footerTextColor: string;
    textUltralightColor: string;
  };
  table: {
    inputs: {
      radio: {
        color: string;
      };
      checkbox: {
        color: string;
      };
    };
    filters: {
      color: string;
      active: {
        backgroundColor: string;
      };
      error: {
        activeBackgroundColor: string;
      };
    };
    column: {
      header: {
        fontSize: string;
        backgroundColor: string;
        color: string;
        dragHandle: {
          idle: string;
          dragging: string;
        };
      };
    };
    fontFamily: string;
    indexColumn: {
      backgroundColor: string;
      selected: {
        color: string;
        backgroundColor: string;
      };
    };
    cell: {
      selected: {
        backgroundColor: string;
      };
      active: {
        borderColor: string;
        spinnerColor: string;
      };
    };
    boolean: {
      toggleChecked: string;
    };
    loading: {
      color: string;
    };
  };
}

interface Themes {
  projectOnboardingTheme: Theme;
  embeddedPortalTheme: Theme;
  fileFeedTheme: Theme;
}

interface Documents {
  projectOnboardingDocument: DocumentConfig;
  embeddedPortalDocument: DocumentConfig;
  fileFeedDocument: DocumentConfig;
}

interface ThemeAndDocumentLookup {
  [key: string]: {
    theme: Theme;
    document: DocumentConfig;
  };
}
const themes: Themes = {
  projectOnboardingTheme: plmThemes.projectOnboardingTheme,
  embeddedPortalTheme: plmThemes.embeddedPortalTheme,
  fileFeedTheme: plmThemes.fileFeedTheme,
};

const documents: Documents = {
  projectOnboardingDocument: plmDocuments.projectOnboardingDocument,
  embeddedPortalDocument: plmDocuments.embeddedPortalDocument,
  fileFeedDocument: plmDocuments.fileFeedDocument,
};

export const themeLookup: ThemeAndDocumentLookup = {
  "project-onboarding": {
    theme: themes.projectOnboardingTheme,
    document: documents.projectOnboardingDocument,
  },
  embed: {
    theme: themes.embeddedPortalTheme,
    document: documents.embeddedPortalDocument,
  },
  "file-feed": {
    theme: themes.fileFeedTheme,
    document: documents.fileFeedDocument,
  },
};
