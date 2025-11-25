'use client';

import { ArrowRight, Code, Database, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const experiences = [
	{
		year: 'CORE',
		icon: Code,
		title: 'Programming & Fundamentals',
		date: 'Core Technologies',
		description: [
			'Python (Intermediate)',
			'SQL (Familiar)', 
			'Java (Basics)',
			'C (Basics)',
			'Data Structures',
			'OOP Concepts',
			'Database Fundamentals',
			'Version Control'
		],
	},
	{
		year: 'WEB',
		icon: Globe,
		title: 'Web Development & Tools',
		date: 'Frontend & Development Tools',
		description: [
			'HTML & CSS',
			'JavaScript',
			'Git & GitHub',
			'Postman API Testing',
			'Version Control',
			'Web Development',
			'Frontend Basics',
			'Development Tools'
		],
	},
	{
		year: 'TECH',
		icon: Database,
		title: 'Frameworks & Advanced Concepts',
		date: 'Learning & Growth Focus',
		description: [
			'React (Basic)',
			'Spring Boot (Basic)',
			'Flask (Basic)',
			'REST API Concepts',
			'Backend Development',
			'Problem Solving',
			'Architecture Planning'
		],
	},
];

export default function About() {
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="min-h-screen bg-[#0a0a0a] py-20 relative overflow-hidden"
			style={{
				background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), #0a0a0a`,
			}}
		>
			{/* Background gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-purple-950/20 to-[#0a0a0a]"></div>
			
			{/* Background animated elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8b5cf6]/10 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
				{/* About Me Section */}
				<div className="grid lg:grid-cols-[300px,1fr] gap-8 lg:gap-12 items-start mb-12 sm:mb-20">
					<div
						className={`transition-all duration-1000 ${
							isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
						}`}
					>
						<h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
							ME, MYSELF
						</h2>
					</div>

					<div
						className={`transition-all duration-1000 delay-300 ${
							isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
						}`}
					>
						<ArrowRight className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-6 sm:mb-8" />

						<div className="space-y-4 sm:space-y-6 text-gray-100 text-base sm:text-lg leading-relaxed">
							<p>
								I am a deep learner who focuses on clearly understanding every
								concept. I take time to explore details, ask questions, and practice
								until I gain accurate and practical knowledge, allowing me to apply
								ideas confidently and effectively in real situations.
							</p>

							<p>
								I am passionate about building efficient and scalable software
								solutions that solve real-world problems. I enjoy collaborating with
								cross-functional teams to deliver high-quality products that exceed
								user expectations.
							</p>
						</div>
					</div>
				</div>

				{/* Selected Works Section */}
				<div className="w-full">
					<h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 text-center">
						SKILLS & EXPERTISE
					</h2>
					<p className="text-center text-gray-200 italic text-base sm:text-xl mb-12 sm:mb-16 px-4">
						"Every experience in my life is important, and has taught me a lot"
					</p>

					<div className="relative">
						<div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-800 hidden lg:block"></div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
							{experiences.map((exp, index) => {
								return (
									<div
										key={index}
										className={`transition-all duration-700 delay-${index * 200} ${
											isVisible
												? 'opacity-100 translate-y-0'
												: 'opacity-0 translate-y-10'
										}`}
									>
										<div className="text-center mb-6 sm:mb-8">
											<div className="inline-flex items-center justify-center mb-3 sm:mb-4">
												<div className="text-4xl sm:text-5xl">
													{exp.icon === Code
														? '👨‍💻'
														: exp.icon === Globe
														? '🌐'
														: '🛢️'}
												</div>
											</div>
											<h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
												{exp.year}
											</h3>
										</div>

										<div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 transition-all duration-300 min-h-[300px] sm:h-[350px] flex flex-col ring-2 ring-[#8b5cf6]">
											<h4 className="text-lg sm:text-xl font-bold text-white mb-2">
												{exp.title}
											</h4>
											<p className="text-white text-xs sm:text-sm mb-3 sm:mb-4">
												{exp.date}
											</p>
											<div className="text-white leading-relaxed flex-grow">
												<ul className="space-y-1">
													{exp.description.map((item, idx) => (
														<li key={idx} className="flex items-start">
															<span className="text-[#8b5cf6] mr-2">•</span>
															<span className="text-xs sm:text-sm">{item}</span>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
