const { useState } = React;

const FAQPage = () => {
    const [language, setLanguage] = useState('en');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);
    
    const t = translations[language];
    

    const filteredFaqs = t.faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    const categoriesWithCount = {
        all: { name: language === 'en' ? 'All Categories' : language === 'pt' ? 'Todas as Categorias' : 'Kategoria Zote', count: t.faqs.length }
    };
    
    Object.keys(t.categories).forEach(cat => {
        categoriesWithCount[cat] = {
            name: t.categories[cat],
            count: t.faqs.filter(f => f.category === cat).length
        };
    });
    
    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };
    
    return (
        <div className="min-h-screen">
            <header className="bg-blue-600 text-white py-6 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <i className="fas fa-truck-fast text-3xl mr-3"></i>
                            <h1 className="text-2xl font-bold">SwiftDrop</h1>
                        </div>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setLanguage('en')} 
                                className={`language-selector px-3 py-1 rounded-full ${language === 'en' ? 'active-language bg-white text-blue-600' : 'bg-blue-500'}`}
                            >
                                EN
                            </button>
                            <button 
                                onClick={() => setLanguage('pt')} 
                                className={`language-selector px-3 py-1 rounded-full ${language === 'pt' ? 'active-language bg-white text-blue-600' : 'bg-blue-500'}`}
                            >
                                PT
                            </button>
                            <button 
                                onClick={() => setLanguage('sw')} 
                                className={`language-selector px-3 py-1 rounded-full ${language === 'sw' ? 'active-language bg-white text-blue-600' : 'bg-blue-500'}`}
                            >
                                SW
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
                    <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
                </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                            <h2 className="text-lg font-semibold mb-4">
                                {language === 'en' ? 'Categories' : language === 'pt' ? 'Categorias' : 'Kategoria'}
                            </h2>
                            <ul className="space-y-2">
                                {Object.keys(categoriesWithCount).map(cat => (
                                    <li key={cat}>
                                        <button
                                            onClick={() => setActiveCategory(cat)}
                                            className={`w-full text-left px-4 py-2 rounded-md transition ${activeCategory === cat ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'}`}
                                        >
                                            <span>{categoriesWithCount[cat].name}</span>
                                            <span className="ml-2 text-gray-500 text-sm">({categoriesWithCount[cat].count})</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="lg:w-3/4">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder={t.searchPlaceholder}
                                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>
                        
                        {filteredFaqs.length > 0 ? (
                            <div className="space-y-4">
                                {filteredFaqs.map((faq, index) => (
                                    <div 
                                        key={index} 
                                        className="faq-item bg-white p-6 rounded-lg shadow-md cursor-pointer transition"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium">{faq.question}</h3>
                                            <i className={`fas ${expandedFaq === index ? 'fa-minus' : 'fa-plus'} text-blue-500`}></i>
                                        </div>
                                        {expandedFaq === index && (
                                            <div className="mt-4 text-gray-600">
                                                <p>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                                <i className="fas fa-question-circle text-5xl text-gray-300 mb-4"></i>
                                <h3 className="text-xl font-medium text-gray-700">
                                    {language === 'en' ? 'No FAQs found' : language === 'pt' ? 'Nenhuma FAQ encontrada' : 'Hakuna FAQs zilizopatikana'}
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    {language === 'en' ? 'Try a different search term or category' : language === 'pt' ? 'Tente um termo de pesquisa ou categoria diferente' : 'Jaribu neno tofauti la utafutaji au kategoria'}
                                </p>
                            </div>
                        )}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                            <h3 className="text-xl font-semibold text-blue-800 mb-2">{t.contactTitle}</h3>
                            <p className="text-blue-700 mb-4">{t.contactText}</p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
                                {t.contactButton} <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center">
                                <i className="fas fa-truck-fast text-2xl mr-2"></i>
                                <span className="text-xl font-bold">SwiftDrop</span>
                            </div>
                            <p className="text-gray-400 mt-2">
                                {language === 'en' ? 'Delivering happiness to your doorstep' : 
                                 language === 'pt' ? 'Entregando felicidade à sua porta' : 
                                 'Kufikisha furaha kwenye mlango wako'}
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
                        <p>
                            &copy; {new Date().getFullYear()} SwiftDrop. 
                            {language === 'en' ? ' All rights reserved.' : 
                             language === 'pt' ? ' Todos os direitos reservados.' : 
                             ' Haki zote zimehifadhiwa.'}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
window.App = () => {
    return <FAQPage />;
};