//3rd party libs

import React from "react";
import {render} from "react-dom";
import domready from "domready";
import {Provider} from "react-redux";
import Router from "react-router/lib/Router";
import Route from "react-router/lib/Route";
import IndexRedirect from "react-router/lib/IndexRedirect";
import {addLocaleData, IntlProvider} from "react-intl";
import de from "react-intl/locale-data/de";
import en from "react-intl/locale-data/en";

//custom libs

import history from "./common/history";
import store from "./common/store";

//localization

import deMessages from "./common/i18n/messagesDe";
import enMessages from "./common/i18n/messagesEn";

//general views

import App from "./component/app/App";
import LoginContainer from "./component/login/LoginContainer";

//user views

import UserContainer from "./component/user/UserContainer";
import WelcomeContainer from "./component/user/welcome/WelcomeContainer";
import SurveyBuilderContainer from "./component/user/surveyBuilder/SurveyBuilderContainer";
import TemplateListContainer from "./component/user/templateList/TemplateListContainer";
import SurveyRunnerContainer from "./component/user/surveyRunner/SurveyRunnerContainer";

//styling
import "./index.scss";

addLocaleData([...de, ...en]);

const DE = "de",
    EN = "en",
    supportedLanguages = [];

supportedLanguages[DE] = deMessages;
supportedLanguages[EN] = enMessages;

const getMessages = (language) => {
    const messages = supportedLanguages[language];
    return messages? messages: supportedLanguages[DE];
};

const language = (navigator.language || navigator.browserLanguage).split("-")[0];

const FullApp = () => {
    return (
        <IntlProvider locale={language} defaultLocale="de" messages={getMessages(language)}>
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRedirect to="login" />
                        <Route path="login" component={LoginContainer}>
                            <IndexRedirect to="/user" />
                            <Route path="/user" component={UserContainer}>
                                <IndexRedirect to="templates" />
                                <Route path="welcome" component={WelcomeContainer} />
                                <Route path="templates" component={TemplateListContainer} />
                                <Route path="build" component={SurveyBuilderContainer} />
                                <Route path="surveyRunner" component={SurveyRunnerContainer} />
                            </Route>
                        </Route>
                    </Route>
                </Router>
            </Provider>
        </IntlProvider>
    );
};

domready(() => {
    render(
        <FullApp />,
        document.getElementById("app")
    );
});
