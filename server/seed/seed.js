import {faker} from "@faker-js/faker";

console.log(faker.person.fullName())
console.log(faker.number.int({min:1,max:5}))
console.log(faker.internet.email())

