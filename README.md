# MitigramStarterApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Assumptions
- The application is to be used on desktop devices.
- The already selected counterparties don't need to be selected in the dialog for counterparty selection.
- The dialog for counterparty selection is used only to add to the existing list of selected counterparties.

## Possible UI additions
- Adapting the styles for mobile devices.
- Email text completion for the input field adding a new email. The text completion will check if the email already exists in the known counterparty emails.
- Search field in the dialogs for adding counterparties. 
- Loading indicator for the request to get the counterparties and when the invitations are sent.
- Other sorting orders, for example by email - asc/desc, etc.
- Update of scroll styles.
- Translations of texts to other languages.

## Notes
- Used data from [Mitigram Starter](https://stackblitz.com/edit/mitigram-starter)
- As the image request were returning an error placeholder user icons were used. The icons were also planned to be used for the addition of emails that do not exist in the counterparty list.
- Sorting is currently possible by group name or counterparty first and last name.
- The app was mainly tested on Chrome and Firefox, possible bugs may be present for other browsers.