exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: "First post",
            content: " This is first post"
        }]
    })
}


exports.createPost = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content

    req.status(201).json({
        message: 'Post created Succefully',
        post : {
            id: new Data().toISOString(),
            title: title,
            content: content ,
        }
    })
}