import Handlebars from 'handlebars';

const registerHelpers = () => {
    Handlebars.registerHelper('json', context => JSON.stringify(context));
    Handlebars.registerHelper('eq', (a, b) => a ===b);
};

export default registerHelpers;
