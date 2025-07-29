const Skeleton = () => (
    <>
        {[...Array(5)].map(() => (
            <tr key={Math.random()}>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-5 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
                </td>
            </tr>
        ))}
    </>
);

export default Skeleton;