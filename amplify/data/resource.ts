import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

/*== Definir el esquema para el nuevo proyecto de guitarras ==*/

const schema = a.schema({
  
  // Modelo para las guitarras
  Guitar: a.model({
    name: a.string().required(),  // Nombre de la guitarra
    description: a.string(),      // Descripción de la guitarra
    price: a.float().required(),  // Precio de la guitarra
    imageUrl: a.string()         // URL de la imagen de la guitarra
   
  })
  .authorization(allow => [
    allow.guest().to(["read"]), // Usuarios invitados (no autenticados) tienen permiso de "lectura"
    allow.authenticated().to(["read"]), // Usuarios autenticados tienen permiso de "lectura"
    allow.owner() // El propietario tiene permisos completos
 ])
});
  
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",

  },
});
/*--------------------------------------------------------------------------------------*/  
// import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

// /*== Definir el esquema para el nuevo proyecto de guitarras ==*/

// const schema = a.schema({
  
//   // Modelo para las guitarras
//   Guitar: a.model({
//     name: a.string().required(),  // Nombre de la guitarra
//     description: a.string(),      // Descripción de la guitarra
//     price: a.float().required(),  // Precio de la guitarra
//     imageUrl: a.string()         // URL de la imagen de la guitarra
   
//   })
//   .authorization(allow => [allow.publicApiKey()])
// });
  
// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({
//   schema,
//   authorizationModes: {
//     defaultAuthorizationMode: "apiKey",
//     // API Key is used for a.allow.public() rules
//     apiKeyAuthorizationMode: { expiresInDays: 30,     },
//   },
// });