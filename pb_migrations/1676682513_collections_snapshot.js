migrate((db) => {
  const snapshot = [
    {
      "id": "8qr1y0hrr4hjtm3",
      "created": "2023-02-17 18:05:47.751Z",
      "updated": "2023-02-18 01:08:12.708Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "xshihymo",
          "name": "avatar",
          "type": "url",
          "required": false,
          "unique": false,
          "options": {
            "exceptDomains": null,
            "onlyDomains": null
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "ljdwhf49grxfg64",
      "created": "2023-02-17 23:39:13.542Z",
      "updated": "2023-02-18 01:08:12.708Z",
      "name": "posts",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "evad35ri",
          "name": "owner",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "8qr1y0hrr4hjtm3",
            "cascadeDelete": true,
            "maxSelect": 1,
            "displayFields": [
              "username"
            ]
          }
        },
        {
          "system": false,
          "id": "9lpzawm6",
          "name": "text",
          "type": "editor",
          "required": true,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "ynpvgmxe",
          "name": "title",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": 60,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "z89hy1jb",
          "name": "summary",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "jhzg5nlp",
          "name": "tags",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "an1a8mod",
          "name": "category",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "ugdc6wgo",
          "name": "likes",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": 0,
            "max": null
          }
        },
        {
          "system": false,
          "id": "igyhxuxi",
          "name": "slug",
          "type": "text",
          "required": true,
          "unique": true,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        }
      ],
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": "",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
