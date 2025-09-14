'use client'
import { CircleCheck, Download, Pencil, Share2, Star, Copy  } from "lucide-react";

type TempProps = {
    changeTemplate: Dispatch<SetStateAction<boolean>>;
};

export default function BookedAction({ changeTemplate } : TempProps ) {

    return (
        <div className={`w-full border border-dashed border-[#85abb4] mt-5 mx-auto p-6 bg-white rounded-lg shadow-md space-y-6`}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CircleCheck size={30} />
                </div>
                <h2 className="text-lg font-semibold text-gray-600 leading-10">Final Notes Ready</h2>
              </div>

              <p className="text-green-800 mb-2">
                Your final notes have been generated successfully.
              </p>
              <p className="text-gray-800 mb-4">
                Please choose an option below
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="border border-dashed border-blue-900 flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                  <Download className="w-4 h-4 mr-2" />
                  Download Notes
                </button>
                
                <button onClick={changeTemplate} className="border border-dashed border-sky-900 flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded hover:bg-sky-200">
                  <Pencil className="w-4 h-4 mr-2" />
                  Change Template
                </button>

                <button className="border border-dashed border-emerald-900 flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded hover:bg-gray-200">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Notes
                </button>


                <button className="border border-dashed border-red-900 flex items-center px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Others
                </button>

                <button className="border border-dashed border-yellow-900 flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200">
                  <Star className="w-4 h-4 mr-2" />
                  Give Feedback
                </button>
              </div>
            </div>
    )
}