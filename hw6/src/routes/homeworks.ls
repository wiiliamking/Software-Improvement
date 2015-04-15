require! {'express', Course: '../models/courses', Content:'../models/homeworkContent', Homework:'../models/homework'}

router = express.Router!

is-student = (req, res, next)->
	if req.user.character == 'student'
		next! 
	else 
		res.write "You're not student!"

is-teacher = (req, res, next)->
	if req.user.character == 'teacher'
		next! 
	else 
		res.write "you're not teacher!"

is-authenticated = (req, res, next)-> if req.is-authenticated! then next! else res.redirect '/'

module.exports = router

router.get '/', is-authenticated, (req, res)!->
	course_id = req.query.course
	console.log course_id
	Course.find-one {_id: course_id}, (err, course)!->
		console.log course
		homeworks = Homework.find {course-id: course._id}, (err, homeworks)!->
			console.log homeworks
			res.render 'homeworkList', homeworks: homeworks, user: req.user, course: course


router.get '/detail/:homeworkId', is-authenticated, (req, res)!->
	user = req.user
	homework = Homework.find-one {id: req.params.homeworkId}
	if user.character is 'teacher'
		Content.find {course: homework-id}, (err, contents)!->
			res.render 'homeworkDetail', contents: contents, user: user, homework: homework
	else
		Content.find {course: homework-id, writer-id, user._id}, (err, content)!->
			res.render 'homeworkDetail', conetent: content, user: user, homework: homework

router.get '/create', is-authenticated, is-teacher, (req, res)->
	course-id = req.query.course-id
	console.log course-id
	res.render 'createHomework', courseId: course-id

router.post '/create/:courseId', is-authenticated, is-teacher, (req, res)->
	course-id = req.param.course-id
	Homework.find-one {name: req.params.name} (err, homework)!->
		console.log req.params.course-id + "..."
		if homework then res.write("This homework has existed!")
		else
			new-homework = new Homework {
				name: req.param 'name'
				deadline: req.param 'deadline'
				content: req.param 'content'
				course-id: req.params.course-id
			}
			new-homework.save!
			res.redirect '/courses'

router.get 'content/:contentId/', is-authenticated, is-teacher, (req, res)->
	Content.find-one {name: req.params.homework-id} (err, homework)!->
		if not content
			res.write 'The homework doesn't exist!'
			res.end!
		else
			res.render 'homeworkContent', content:homework, user:user

router.get "/:homeworkId/check", is-authenticated, is-teacher, (req, res)->
	Content.find {homework-id:req.params.homework-id}, (err, contents)!->
		res.render 'homeworkContentList', contents:contents

router.get "/:contentId/enscore", is-authenticated, is-teacher, (req, res)->
	Content.find-one {id: req.params.content-id}, (err, content)
	res.render 'enscoreHomework', content:content

router.post "/:contentId/enscore", is-authenticated, is-teacher, (req, res)->
	content = Content.find-one {id: req.params.homework-id}

router.post "edit/:homeworkId/", is-authenticated, is-teacher, (req, res)->
	Homework.find-one {id: homeworkId}, (err, homework)!->
		if not homework
			res.write 'The homework doesn't exist!'
			res.end!
		else
			homework.deadline = req.param 'deadline'
			homework.instruction = req.param 'instruction'
			homework.name = req.param 'name'
			homeworks.save!

router.get 'write/:contentId/', is-authenticated, is-student, (req, res)->
	Content.find-one {writer-id: req.user.id, _id: req.params.content-id}, (err, content)!->
		if not content
			content = new Content {
				homework-id: req.query.homeworkId,
				content: '',
				writer-id: 'req.user.id'
			}
			content.save!
		res.render 'writeHomework', {user=req.user, course-name=course.name, content=content}

router.post 'write/:contentId/', is-authenticated, is-student, (req, res)->
	Content.find-one {writer-id: req.user.id, homework-id: req.params.homework-id}, (err, content)!->
		if not content
			res.write 'Error'
			res.end!
		else
			content.content = req.params 'content'
			content.save!

