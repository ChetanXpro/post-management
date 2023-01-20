const errorHandler = (
	err: { stack: any; message: any },
	req: any,
	res: { statusCode: any; status: (arg0: any) => void; json: (arg0: { message: any }) => void },
	next: any
) => {
	console.log(err.stack)

	const status = res.statusCode ? res.statusCode : 500

	res.status(status)

	res.json({ message: err.message })
}

export default errorHandler
