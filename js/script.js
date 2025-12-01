import { timelineData, projectsData, skillsData } from './data.js';

document.addEventListener('DOMContentLoaded', function () {
            
    const timelineContainer = document.getElementById('timeline-container');
    timelineData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-item relative mb-10';
        
        let pointsHTML = item.points.map(point => `<li>${point}</li>`).join('');

        div.innerHTML = `
            <div class="flex gap-6 items-start pl-2">
                <img src="${item.image}" 
                    class="${item.imageSize} rounded-lg object-cover shadow-md ${item.imageMargin}" />
                <div>
                    <h3 class="text-lg font-bold text-[#fcfafa]">${item.title}</h3>
                    <p class="font-semibold text-[#FFC107]">${item.institution}</p>
                    <p class="text-sm text-[#FFC107] mb-2">${item.period}</p>
                    <ul class="list-disc list-inside text-[#fcfafa] space-y-1">${pointsHTML}</ul>
                </div>
            </div>
        `;
        timelineContainer.appendChild(div);
    });

    const projectsContainer = document.getElementById('projects-container');
    projectsData.forEach(project => {
        const div = document.createElement('div');
        div.className = 'bg-[#bac0dc] hover:bg-[#c7cce6] p-6 rounded-lg shadow-md border border-[#bac0dc] hover:shadow-xl transition-all duration-300 cursor-pointer';
        div.setAttribute('data-project-id', project.id);
        div.innerHTML = `
            <h3 class="text-lg font-bold text-[#004e96]">${project.title}</h3>
            <p class="mt-2 text-[#555555] text-sm">${project.short_desc}</p>
            <span class="mt-4 inline-block text-[#004e96] font-semibold">More &rarr;</span>
        `;
        projectsContainer.appendChild(div);
    });

    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: skillsData.labels,
            datasets: [{
                label: 'Skills',
                data: skillsData.values,
                backgroundColor: 'rgba(255, 255, 255, 0.84)', /* Link/Button with opacity */
                borderColor: 'rgba(255, 255, 255, 0.84)', /* Link/Button */
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: "#FFFFFF" // warna angka sumbu X
                    },
                    grid: {
                        color: '#CCCCCC' /* Dividers */
                    }
                },
                y: {
                    ticks: {
                        color: "#FFFFFF", // <<-- Ubah warna label Microsoft, Python, dll
                        padding: 20,
                        font: {
                            size: 14,
                             weight: '600'
                        }
                    },
                   grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Skills: ${context.parsed.x}%`;
                        }
                    }
                }
            }
        }
    });

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModalButton = document.getElementById('close-modal-button');
    
    projectsContainer.addEventListener('click', function(e) {
        const card = e.target.closest('[data-project-id]');
        if (card) {
            const projectId = parseInt(card.getAttribute('data-project-id'));
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-objective').textContent = project.objective;
                document.getElementById('modal-role').textContent = project.role;
                document.getElementById('modal-tools').textContent = project.tools;
                document.getElementById('modal-impact').textContent = project.impact;
                const modalLink = document.getElementById('modal-link');
                modalLink.href = project.link;
                modalLink.style.display = project.link === '#' ? 'none' : 'inline-block';
                
                modal.classList.remove('invisible', 'opacity-0');
                modalContent.classList.remove('scale-95');
            }
        }
    });

    const closeModal = () => {
        modal.classList.add('invisible', 'opacity-0');
        modalContent.classList.add('scale-95');
    };

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.getElementById('current-year').textContent = new Date().getFullYear();

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/80', 'backdrop-blur-sm', 'shadow-sm');
            // Change header text/link colors when scrolled down
            header.querySelector('a[href="#hero"]').classList.remove('text-white');
            header.querySelector('a[href="#hero"]').classList.add('text-[#051e7c]'); // Main text color
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-white', 'hover:text-gray-200');
                link.classList.add('text-[#051e7c]', 'hover:text-[#222222]'); // Secondary text color
            });
            document.querySelector('#mobile-menu-button').classList.remove('text-white');
            document.querySelector('#mobile-menu-button').classList.add('text-[#555555]'); // Secondary text color
        } else {
            header.classList.remove('bg-white/80', 'backdrop-blur-sm', 'shadow-sm');
            // Revert header text/link colors when at top
            header.querySelector('a[href="#hero"]').classList.remove('text-[#051e7c]');
            header.querySelector('a[href="#hero"]').classList.add('text-white');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-[#051e7c]', 'hover:text-[#222222]');
                link.classList.add('text-white', 'hover:text-gray-200');
            });
            document.querySelector('#mobile-menu-button').classList.remove('text-[#555555]');
            document.querySelector('#mobile-menu-button').classList.add('text-white');
        }
    });
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('.nav-link, #mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if(!mobileMenu.classList.contains('hidden')) {
               mobileMenu.classList.add('hidden');
            }
        });
    });
});
