/**
 * Curated AJIO catalogue groups. 180 live-offer IDs grouped by keyword.
 * Last audited 2026-11-16 (offer IDs + titles match the backend at that date).
 */
export interface AjioSection {
  id: string;
  name: string;
  lead: string;
  /** Coupon IDs in this section. Preserves the backend's recommended order within the group. */
  ids: string[];
}

export const AJIO_SECTIONS: AjioSection[] = [
  {
    "id": "other",
    "name": "All remaining deals",
    "lead": "The rest of the AJIO rack \u2014 flash sales, exclusive brands and limited-quantity clearances.",
    "ids": [
      "0105748d-07d3-4db5-b07b-43002eeca04e",
      "06410195-fbe0-4f2b-902a-3457ef4d11e6",
      "06518838-ee1e-46ac-96b8-8c88d6d05d36",
      "071a4719-9f82-4052-a3ac-2ba08c47e38f",
      "085c1aff-321e-4393-b519-953a916f3576",
      "0d779f8a-46dc-4e42-bdd1-5ce652ddfda6",
      "0de3f412-19d9-440c-a404-5a9354a61043",
      "104a866c-3368-4665-9052-1c482821ff37",
      "1a150858-6590-45a1-aad3-af0e6577d33c",
      "1eb9382c-8d17-4b6b-9220-97ab502ce929",
      "2d2fab65-c3b4-4710-9650-7fbf5d2e82a6",
      "2d612c46-f34e-4b27-91f5-f7dff95102c7",
      "2e462545-0385-43f2-b091-6069211d9bdd",
      "2fab8244-3c58-45ad-a0af-f2fae64aeb8a",
      "2ffef19b-767f-4897-a688-445ceb1fcdfa",
      "30044ee0-8e4e-4864-b6e7-3866df96b537",
      "310d2dbf-2eac-47d0-92fa-1fa84841dd7c",
      "330fbf04-b937-4091-aa32-8327cbf24423",
      "36ba4197-5ca9-4bf3-baa2-4ab13ed02b75",
      "3b5c48b4-94a9-4a27-91e2-2b9ef5f44e56",
      "45ccdae8-8a68-4548-b071-4102a33cba8f",
      "487ccf86-ed29-47d2-a1b1-6c9b94e1fb12",
      "4c87ed37-4995-4fb1-a58a-0d38e9d9ba78",
      "4fa15256-0ce7-4572-a152-0bc2a1632d5c",
      "52093945-9356-4816-8582-d50b6dd9898d",
      "532ff2b1-a03c-433f-82f3-3fc54e85322e",
      "53b1785c-e7b5-4a4d-a1da-2555b6a5d136",
      "552edfbe-7cb7-4dca-8178-5699ac17b11f",
      "5ba110af-d9e4-458c-b64e-566a17aba73f",
      "5fae087b-2e62-4521-8733-e4d70875d1ce",
      "6d09a5b5-8915-49d0-8f48-58b1f51932ea",
      "707059f7-174b-4b14-bb79-2ff9c726ef03",
      "712134ed-3a87-4be7-91c7-775e8aeb6183",
      "72adab4a-83ad-4ba5-b510-e56a6f1176aa",
      "7cfbef49-3d70-4f00-8dd8-475c40cc4fad",
      "818b4354-994d-40bd-9bc7-d3169c61bda1",
      "820fc22a-43dc-435c-acc2-108e2a3be4f8",
      "9096aee2-f13d-42da-9537-f6a72cc03f3f",
      "94fb6307-c45e-4fe7-a9bb-adf0475f9d1c",
      "9a2332c7-2f6a-497b-b5b9-3355d2d97231",
      "9b4c6e51-888f-4271-9136-b3bb59869a13",
      "9dcdda21-1af1-4c07-a08a-202f1a9f818a",
      "9f4fb580-77ed-44e7-b7f7-6f4bf6385727",
      "9f56647b-c449-480c-a58c-6c43942eddb7",
      "a3dab6ba-c815-4de5-8788-d0b76afa507d",
      "a42b5865-0f68-48f0-bcb2-a632a59cec6d",
      "afee13cb-e5ef-409a-9eeb-99de613d35c1",
      "b88e75d1-a554-4862-b181-3f369d71a3e5",
      "c558fb50-be3e-4cae-9d6a-4515471f0ec4",
      "d1b2b710-be42-409e-8e74-e036dd86c921",
      "d8f98ea0-ec30-4b56-be02-14482f6f862b",
      "def52f5d-d0b2-4bbf-97e9-76fede89a6c3",
      "df471819-c38b-407b-bad8-96ae547b662c",
      "e07fd7c7-a168-4ed0-b9ea-3620f94e0118",
      "e39fc6b7-7b8c-41ab-adb4-3c5e139aced0",
      "ed4e4f1f-6a9f-40de-8dc0-45f0afc65d74",
      "f214d17f-a5bd-44b6-8787-c09dd95c865f",
      "f3560a41-b6ba-4cd6-bce0-1f0f4bd413a3",
      "f796fa0d-98d4-40f6-80b9-8d11b774fa1a",
      "fff54227-4ecb-48ab-ac70-9cc7364e6e09"
    ]
  },
  {
    "id": "men",
    "name": "Men's clothing",
    "lead": "Formal, smart-casual and workwear \u2014 Roadster, Mufti, Louis Philippe and about two dozen other labels with an eye on India's office.",
    "ids": [
      "0434049a-5153-4921-a4bf-4164141cda8a",
      "11b83399-92f5-4189-83a5-56bdfc31fac1",
      "162bfa77-c2f9-427b-a17d-e7910235c522",
      "196a9f23-c954-49ee-8074-e82fdd6286d1",
      "1b2679b4-0c41-4de9-bbbb-0377a3d3010c",
      "1b959285-17b0-485a-a3bf-d5ef022463cc",
      "2f102e80-3816-4f7d-904a-54adc0772716",
      "368c4963-8218-4b66-a3a2-8c6fff47285f",
      "46a78eeb-9e7a-4338-a902-4543842e1226",
      "49e70f8c-a04e-41f7-8e46-51d8f4c025e8",
      "4c21a9d9-8e79-4979-a5fc-14d79f3b8475",
      "4d433f44-f00d-4034-8039-9a815d877125",
      "5977ff8f-71dc-4066-8bc7-e47e8a37b367",
      "5d16d252-6ab9-4b83-b23b-70a05d49d0a2",
      "5e6206aa-076c-4e51-abb3-e34966959104",
      "661e7b1f-4509-40de-857e-e68558c6ff7a",
      "71a621f6-246b-4edb-9539-64537fb72d75",
      "9bc2fb19-52a3-4be8-854d-3ba74096b9b8",
      "a28e3a2a-87c0-4aff-9473-980ce34e39ba",
      "ae44d1a8-75af-4cf7-bc1c-ec406d4ffb50",
      "b5038be1-5f06-4c76-aba3-8a5fc4ffb10a",
      "b7201c92-1b1d-48e5-a86b-d5eb125e4c76",
      "c8f91fd7-acec-4985-b396-821e38f99bb6",
      "c9f8d409-2a4b-4459-a607-e574cbb695ae",
      "d3e3fcea-d1f4-4d9c-b8d8-a5818e1ccd70",
      "d70985a5-f2e7-4756-9a63-3e25bc1b2b0d",
      "d8300045-818a-4af3-898c-f9a14e9ad7b8",
      "e2b94080-a801-419a-9056-c61b1c6045be",
      "e9262742-e208-45e8-9873-a3298ab3268b",
      "f40e8494-d95f-4e55-9918-6e938f883bf6"
    ]
  },
  {
    "id": "denim",
    "name": "Denim & jeans",
    "lead": "From selvedge raw to comfort-stretch \u2014 Levi's, Wrangler, Spykar and Buda Jeans move the needle.",
    "ids": [
      "252047ea-7c68-4aab-889f-e2060c678512",
      "4e984e14-8420-4c32-b99d-da7a0d4182dc",
      "51be3993-9c74-44de-8d40-2bb93cf1b68d",
      "57487c5c-7ff2-4993-9f7c-30b7d14ce088",
      "73554eb2-88f4-45d8-bfbd-01c034ca2b9e",
      "78cb3aa2-b84a-47e6-89b8-d86835e9d5c2",
      "c95850a7-0eff-4f3e-bd60-d16809b08524",
      "d50894e5-8ba2-4ac6-8931-8855bf7631b6"
    ]
  },
  {
    "id": "women",
    "name": "Women's edit",
    "lead": "Ethnic, fusion and every-day \u2014 Rio Collections, Libas, Aurelia, Biba and a long rack of others.",
    "ids": [
      "06da35d7-54ce-4f6c-b41c-20684563dddb",
      "07734738-a14d-40be-80e0-82a9d71f78fd",
      "0854a746-61ee-4f60-b645-5b2e2b86f310",
      "0f532cd9-4136-4750-a5b5-9f34091708ad",
      "1b9b2fc9-5649-4404-a6c6-26f2365adc43",
      "1d0f7085-1bf5-46ae-93b4-cdd8243acba0",
      "30fa1fde-70f5-45ca-8343-4deec090d475",
      "313f7604-5e2e-480a-9149-dc6da6a32821",
      "43c6faf7-251a-4e1c-9aa6-4a1930fc1b5a",
      "4b09e6e0-3476-47d2-b4ee-a23d6f607669",
      "4fb4c89d-fa3c-494f-9250-9bf3ee5b5271",
      "5d0b6dcc-cd69-4907-97c9-8c15965a16bd",
      "670acbee-f840-43c2-8e5c-ae3c53bf4cea",
      "72d604aa-263b-4e68-a344-1db98531f754",
      "7367526c-1140-4924-ad8b-1b60ee8a21de",
      "73f043d2-ca83-4caa-9bf1-2ccefbd5e2b0",
      "7944295b-b7d1-4626-8ee7-04ce6092819e",
      "8863f8f4-60c0-4758-8ce9-acf2fe9dc868",
      "a77371e9-8a9e-4f8d-9752-bd4e8fa5acd4",
      "a7e9d1a1-07f3-455d-9b81-01987bc7f5b3",
      "a85302a6-aae6-461f-a471-691b87848447",
      "b55a81f0-d633-4633-bf60-aa66a10cc534",
      "d98e3cd8-1e1d-48e9-9656-a5da04c9ce63",
      "ddc5c3fa-2a16-463d-be4c-58ee63a75e3a",
      "dec629b8-f4e2-41e0-94c3-78539825216d"
    ]
  },
  {
    "id": "footwear",
    "name": "Footwear",
    "lead": "Sneakers, heels, loafers and boots \u2014 Puma, Skechers, Converse, Steve Madden and more.",
    "ids": [
      "1a701354-6391-4e0d-a9d2-b135ae35b293",
      "28e91cf3-de8e-453e-a424-f9780406c4ee",
      "3078c12c-3a6a-4f75-aeb6-e9fe296f3cc2",
      "557e8ece-e7f3-4e3d-b290-45aa322cbe5d",
      "58498a21-8a55-4416-a260-a546f920dac1",
      "7a78afe9-0811-4c87-bb37-91ccef5205f7",
      "7d110a92-094e-41b9-be2d-6b1e0702a47c",
      "846d5eb9-edd5-4cb6-ad97-873f7f23a914",
      "9d5183c6-3e67-42da-aa26-ab1cbbfb72f5",
      "a6025cb5-05e4-445a-a1d9-af4cd311490b",
      "a60a4aa8-c423-49d4-af74-9494058632c1",
      "a927bd47-14d0-4d40-9e91-8a60559c8174",
      "d6b86061-d432-447c-ba52-1be50b1eac71",
      "d79e29d6-0177-4f54-a15c-cffa4f6e3515",
      "f6f400f1-8800-4080-800c-5a9b9ecb275e"
    ]
  },
  {
    "id": "accessories",
    "name": "Accessories",
    "lead": "Watches, bags, eyewear, perfumes \u2014 Fastrack, IDEE, Ajmal, Timex and the supporting cast.",
    "ids": [
      "1f367aab-c45f-4e9b-b79c-d89bf041d300",
      "3868383a-24c1-4d7f-87da-6f051c4d1827",
      "39d0f4fb-ef5b-449e-bf3f-c3b36baecdb5",
      "528c6f0f-f3a9-4212-97cc-12010b094336",
      "6bc0f89a-0bb8-4acb-961f-75865607476d",
      "96e7c4f6-f4f5-4ff3-a585-1fd6b1a0a486",
      "af58dd36-03a9-4426-bb55-4528ba682975",
      "c63ca88d-9f4d-4654-87f0-846ed6da5546",
      "dc6a89c1-aca2-4a42-ac31-78b33240c4c9"
    ]
  },
  {
    "id": "beauty",
    "name": "Beauty & grooming",
    "lead": "Skincare, makeup and the trades \u2014 Lakme, Maybelline, Philips, MuscleBlaze and more.",
    "ids": [
      "046c3db1-f10d-40f2-858c-8735be756c75",
      "1e6db427-4997-4529-a2a6-aa77f7a9e5c0",
      "3d15e1b5-c1fd-47d6-bfef-127dd047cc20",
      "7ac54f42-9918-4152-8462-98c12e455c8b",
      "85a744a5-ccc2-4494-8192-3ba2feee6b0d",
      "a6e08ff9-6404-440a-9c1f-ca9f0693670f",
      "f3bf43de-9717-4d67-8fe6-4a90a33fd331",
      "f75dda42-4adf-41ef-9273-f883491f77a5"
    ]
  },
  {
    "id": "kids",
    "name": "Kids & baby",
    "lead": "Clothing, toys and everyday essentials from Mothercare, Hopscotch and Hamleys.",
    "ids": [
      "64c703e4-6db6-45d5-9009-ef56564c4541",
      "6ba69242-af59-4593-b254-995d60177fcc",
      "81a3ae9f-614f-4346-b2ee-56e39c78d8c2",
      "9279f0fe-505e-49eb-837b-a526ec22ee6a",
      "fe9a1760-563e-41b3-96c3-88431fc0159c"
    ]
  },
  {
    "id": "home",
    "name": "Home & kitchen",
    "lead": "Bedsheets, cushions, kitchen gear \u2014 Spaces, Prestige and Home Centre in one tab.",
    "ids": [
      "115e8c3c-859c-44af-977c-c158a0eb93a5",
      "538d1533-77d8-41e3-9cb5-c74118302897",
      "6295863c-8130-4a06-82d4-d3f8eb7c494b",
      "cd19992b-c736-4e8f-8800-837953933c53"
    ]
  },
  {
    "id": "sports",
    "name": "Sports & fitness",
    "lead": "Training, yoga, dance and recovery \u2014 Decathlon, Adidas, Reebok, HRX, Boldfit and Kappa.",
    "ids": [
      "04725d76-f0ca-41e7-9eeb-1b5d619c2f53",
      "2a866f8c-b437-4943-bc71-d4fd3b78dfe4",
      "3b7e449c-aebd-45b5-882d-0a9409bfbe7a",
      "633e3293-139d-41d3-a5c5-bd114f4ced56",
      "7975cfbd-863d-460f-97e3-075a45f6b5d2",
      "a230c8d6-4c72-45d8-9068-095d3ac29dfa",
      "b2cf836a-b10b-412c-8ab1-af6db4375162"
    ]
  },
  {
    "id": "gadgets",
    "name": "Gadgets & electronics",
    "lead": "Audio, power, smartwatches and the odd laptop accessory.",
    "ids": [
      "363e8ffd-959b-4990-91e4-98969efd1df6",
      "67baac22-25ca-441c-b3bb-5d1e33cc6459",
      "6a2014d6-23b8-4ad1-8c96-f8886f6cbf30",
      "70e661b6-5a49-48ef-98e8-815fcdbe8c8b",
      "7bc422f6-e157-48bc-b220-0c05516d1fa5",
      "ef0fb22b-d170-4c43-b583-23050ea70d3f"
    ]
  },
  {
    "id": "leisure",
    "name": "Books, stationery & pet",
    "lead": "Crossword books, Classmate notebooks and the one pet deal in the rack.",
    "ids": [
      "40d6d5d4-4f49-4ca7-be17-8e1ffbd92ad5",
      "52ccc9f9-f783-4fe1-86c5-e760fc48c859",
      "b3d9f33f-e7df-4efb-b1d6-f3bd02b8a225"
    ]
  }
]
