import React, { useState } from 'react';
import { AuthorisationFormAdder } from "../AuthorisationFormAdder/AuthorisationFormAdder";
import { RegistrationFormAdder } from "../RegistrationFormAdder/RegistrationFormAdder"

export function FormSwitcher({activeTab}) {

    switch (activeTab) {
      case 'Authorisation':
        return <AuthorisationFormAdder />;
      case 'Registration':
        return <RegistrationFormAdder />
    }

}