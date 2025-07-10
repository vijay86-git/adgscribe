const Skeleton = () => (
    <>
        {[...Array(5)].map(() => (
            <tr key={Math.random()}>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-5 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-20 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-20 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-20 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
            </tr>
        ))}
    </>
);

export default Skeleton;