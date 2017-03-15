Topic
=====

Structure
---------
```
{
  objectId: [string],
  createdAt: [datetime],
  updatedAt: [datetime],
  name: [string],
  owner: [User],
  members: [Users],
  org: [Org],
  typeDetails: [object],
  typeExtras: [array],
  type: [string], // todo|event|poll|signup|notice|...
  baseType: [string], // events|tasks
  tasks: [array], // list of tasks related to topic with details about who assigned to, etc
  events: [array], // list of events related to topic with details,
  reminders: [array], // list of reminders related to topic
}
```

