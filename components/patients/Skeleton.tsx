const Skeleton = () => (
    <>
        {[...Array(5)].map(() => (
            <tr key={Math.random()}>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-5 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-5 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-left">
                    <div className="h-4 w-12 bg-gray-200 animate-pulse rounded" />
                </td>

                <td className="px-4 py-3 text-left">
                    <div className="flex">
                        <div className="h-4 w-5 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-5 ml-3 bg-gray-200 animate-pulse rounded" />
                    </div>
                </td>

            </tr>
        ))}
    </>
);

export default Skeleton;