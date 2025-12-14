const About = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-700 text-center mb-6">
        About eTuitionBd
      </h1>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
        eTuitionBd is a modern tuition management platform connecting students
        with qualified tutors. Our goal is to simplify tuition finding, improve
        transparency in payments, and enable easy communication between students
        and tutors.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Qualified Tutors</h2>
          <p className="text-gray-500">Find experienced and verified tutors for every subject and class.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Easy Payments</h2>
          <p className="text-gray-500">Transparent payment system to ensure tutors get paid securely.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Smart Scheduling</h2>
          <p className="text-gray-500">Manage your tuitions and schedule classes efficiently online.</p>
        </div>
      </div>
    </div>
  )
}

export default About
