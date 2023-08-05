type IProps = {
	message: string
}

const ErrorMessage = ({ message }: IProps) => {
	return <div className="error-msg">{message}</div>
}

export default ErrorMessage
