const Skeleton = () => (
    <>
        {[...Array(5)].map((_, i) => (
            <tr key={i}>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-5 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-24 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-24 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-5 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-24 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-24 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>
                <td className="px-4 py-3 text-center">
                    <div className="h-4 w-12 mx-auto bg-gray-200 animate-pulse rounded" />
                </td>

                <td className="px-4 py-3 text-center">
                    <div className="flex">
                        <div className="h-4 w-5 mx-auto bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-5 mx-auto bg-gray-200 animate-pulse rounded" />
                    </div>
                </td>

            </tr>
        ))}
    </>
);

export default Skeleton;