// components/FieldErrorMessages.tsx

type FieldErrorMessagesProps = {
    errors: { [field: string]: string[] };
};

const FieldErrorMessages = ({ errors }: FieldErrorMessagesProps) => {
    if (!errors || Object.keys(errors).length === 0) return null;

    return (
        <>
            {Object.entries(errors).map(([field, messages]) => (
                <div key={field}>
                    <ul className="mb-5">
                        {messages.map((msg, index) => (
                            <li className="err text-sm" key={index}>
                                {msg}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default FieldErrorMessages;