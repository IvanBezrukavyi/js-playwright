import { faker } from "@faker-js/faker/locale/en_US";

export class UserDataGeneration {
  static generateUserData() {
    const fullName = faker.person.fullName();
    const email = faker.internet.email({ provider: "demoqa.com" });
    const streetAddress = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();

    const currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
    const permanentAddress = `456 Elm St, ${city}, ${state}, ${zipCode}`;

    return {
      fullName,
      email,
      currentAddress,
      permanentAddress,
    };
  }
}

