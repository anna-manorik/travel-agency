import { useDispatch } from 'react-redux';
import { filterByCategory, filterByPrice, filterByDate, filterByRate } from '../redux/slice.ts'
import { AppDispatch } from '../redux/store.ts';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

type PriceFilter = {
    minPrice: number,
    maxPrice: number
}

type FilterTypeMap = {
    category: string;
    price: PriceFilter;
    date: string;
    rate: string;
};

const Filters = () => {
    const dispatch = useDispatch<AppDispatch>();
          
    // const handlerFilterByCategory = (category: string) => {
    //     dispatch(filterByCategory(category))
    // }

    // const handlerFilterByPrice = (values: PriceFilter) => {
    //     dispatch(filterByPrice({ minPrice: values.minPrice, maxPrice: values.maxPrice }))
    // }

    // const handlerFilterByDate = (date: string) => {
    //     dispatch(filterByDate(date))
    // }

    // const handlerFilterByRate = (rating: string) => {
    //     dispatch(filterByRate(rating))
    // }

    const handleChange = <T extends keyof FilterTypeMap>(
        type: T,
        value: FilterTypeMap[T]
      ) => {
        switch (type) {
          case 'category':
            dispatch(filterByCategory(value as FilterTypeMap['category']));
            break;
          case 'price':
            dispatch(filterByPrice(value as FilterTypeMap['price']));
            break;
          case 'date':
            dispatch(filterByDate(value as FilterTypeMap['date']));
            break;
          case 'rate':
            dispatch(filterByRate(value as FilterTypeMap['rate']));
            break;
        }
      };

    const inputClass = "border border-gray-300 rounded-lg px-3 py-2 focus:outline-yellow-400";

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 text-sm sm:text-base">
        {/* Категорія */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="font-semibold min-w-[150px]">Filter by category:</label>
            <select
            onChange={(e) => handleChange('category', e.target.value)}
            className={inputClass}
            >
            <option value="All">All</option>
            <option value="Excursion">Excursion</option>
            <option value="Sea">Sea</option>
            </select>
        </div>

        {/* Ціна */}
        <div className="flex gap-2">
            <label className="font-semibold">Filter by price:</label>
            <Formik
            initialValues={{ minPrice: 0, maxPrice: 0 }}
            onSubmit={(values, actions) => {
                handleChange('price', values);
            }}
            >
            <Form className="flex sm:flex-row items-center gap-3">
                <Field
                as="input"
                name="minPrice"
                type="number"
                placeholder="Min price"
                className="w-full max-w-[70px] sm:w-auto border border-yellow-400 rounded px-3 py-2"
                />
                <Field
                as="input"
                name="maxPrice"
                type="number"
                placeholder="Max price"
                className="w-full max-w-[70px] sm:w-auto border border-yellow-400 rounded px-3 py-2"
                />
                <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2 rounded-xl transition"
                >
                OK
                </button>
            </Form>
            </Formik>
        </div>

        {/* Дата */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="font-semibold min-w-[150px]">Filter by date:</label>
            <input
            type="date"
            onChange={(e) => handleChange('date', e.target.value)}
            className={inputClass}
            />
        </div>

        {/* Рейтинг */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="font-semibold min-w-[150px]">Filter by rating:</label>
            <select
            onChange={(e) => handleChange('rate', e.target.value)}
            className={inputClass}
            >
            <option value="All">All</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            </select>
        </div>
        </div>
    )
}

export default Filters