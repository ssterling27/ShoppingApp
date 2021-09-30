# 09-29-21

## Today's Agenda
- Intro to Mongoose


## Notes

#### Async Functions will await whatever promise and stop the next lines of code from executing
> async function example () {
>   const response = await new Promise((resolve, reject) => resolve(true))
>   console.log('This will not run until the above is finished')
>   return response
> }

#### Use Async/Await logic to write a function that connects your NodeJS to your MongoDB
> async function syncDB() { await mongoose.connect('mongodb://localhost:27017/<db_name>') }

#### Create a Schema to define the fields on the document (like columns on a row)
> const MyModel = new Schema({ <new_field>: <data_type> })

#### Instantiate within your database by assigning that Schema as a Model within your database
> model('ModelName', MyModel)

#### Use the find() method to return documents from MongoDB
> Model.find({ ...conditions })

#### Use the create() method to make a new document in your database
> Model.create({ ...dataValues })

#### Use the findByIdAndUpdate() method to locate a document and apply changes
> Model.findByIdAndUpdate(<document_id>, { $set: { ...newValues }, $push: { ...newArrayItem } })

#### Use the findByIdAndDelete() method to locate a document and remove it
> Model.findByIdAndDelete(<document_id>)

#### You can make your express route functions asynchronous for cleaner code
> router.get('/<data_name>', async function (req, res) {
>   const <data_array> = await Model.find({ ...conditions })
>   res.json(<data_array>)
> })

#### Place the id of another collection on yours to create an ownership
> <custom_field>: {
>     type: Schema.Types.ObjectId,
>     ref: '<model_name>',
>   }

#### Create an array of id's to make several documents belong to one
> <custom_field>: [{
>     type: Schema.Types.ObjectId,
>     ref: '<model_name>'
>   }]

#### Run the populate method to replace the id's in an association field with the actual data
> Model.find({}).populate('<custom_field>')

