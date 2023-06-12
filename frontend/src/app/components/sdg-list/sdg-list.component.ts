import { Component } from '@angular/core';
import { Sdg } from './sdg-list.interface';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('200ms ease-out')),
      transition('default => rotated', animate('200ms ease-in'))
    ])
  ]
})

export class SdgListComponent {
  public isSdgOpened = Array(17).fill(false);
  public sdgs = [
    {
      id: 1,
      name: 'No Poverty',
      information: `The first SDG aims to eradicate extreme poverty and reduce inequality. This includes implementing social protection systems, increasing access to basic services and resources, and creating opportunities for sustainable livelihoods. The goal also calls for policies that address the root causes of poverty, such as discrimination and exclusion, and promote economic and social inclusion. Achieving this goal would ensure that everyone has access to the basic necessities of life and can live with dignity and respect.`
      , sdgImage: '../assets/sdg_1.png',
      arrowImage: '../assets/arrow.png',
      state: 'default'
    },
    {
      id: 2,
      name: 'Zero Hunger',
      information: `The second SDG aims to ensure that everyone has access to sufficient, safe, and nutritious food all year round. It seeks to promote sustainable agriculture and support small-scale farmers, as well as reduce food waste and loss. The goal also addresses the issue of malnutrition and the need for improved nutrition for all. Achieving this goal would not only improve people's health and well-being, but also support economic growth and reduce poverty and inequality.`
      , sdgImage: './assets/sdg_2.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 3,
      name: 'Good Health and Well-Being',
      information: `The third SDG aims to reduce maternal and child mortality, combat infectious diseases, and promote access to essential healthcare services. It also calls for increased efforts to prevent and treat non-communicable diseases, improve mental health, and promote healthy lifestyles. Achieving this goal would ensure that everyone has access to quality healthcare services and can live healthy and fulfilling lives.`
      , sdgImage: './assets/sdg_3.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 4,
      name: 'Quality Education',
      information: `The fourth SDG aims to provide access to quality education for all, regardless of gender, location, or socioeconomic status. It also calls for increased investment in education, teacher training, and infrastructure, as well as promoting vocational and technical skills. Achieving this goal would promote economic growth and reduce poverty and inequality, as well as empower individuals and promote social inclusion.`
      , sdgImage: './assets/sdg_4.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 5,
      name: 'Gender Equality',
      information: `The fifth SDG aims to eliminate all forms of discrimination and violence against women and girls, and promote their full and equal participation in all spheres of life. It also calls for equal access to education, healthcare, and economic opportunities, as well as increased representation in leadership and decision-making positions. Achieving this goal would not only benefit women and girls, but also promote social and economic development for all.`
      , sdgImage: './assets/sdg_5.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 6,
      name: 'Clean Water and Sanitation',
      information: `The sixth SDG aims to provide access to safe and affordable drinking water and sanitation for all, as well as improve water quality and reduce pollution. It also calls for increased investment in water infrastructure and management, and promoting hygiene and water conservation. Achieving this goal would improve health and well-being, as well as support economic growth and environmental sustainability.`
      , sdgImage: './assets/sdg_6.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 7,
      name: 'Affordable and Clean Energy',
      information: `The seventh SDG aims to increase access to clean and renewable energy sources, such as solar and wind power, and promote energy efficiency. It also calls for increased investment in energy infrastructure and technology, and promoting sustainable energy policies and practices. Achieving this goal would not only reduce carbon emissions and mitigate climate change, but also promote economic growth and reduce poverty.`
      , sdgImage: './assets/sdg_7.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 8,
      name: 'Decent Work and Economic Growth',
      information: `The eighth SDG aims to create more and better jobs, reduce unemployment and underemployment, and promote sustainable economic development. It also calls for policies that promote entrepreneurship, innovation, and inclusive economic growth. Achieving this goal would improve living standards and reduce poverty and inequality, as well as support environmental sustainability.`
      , sdgImage: './assets/sdg_8.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 9,
      name: 'Industry, Innovation and Infrastructure',
      information: `The ninth SDG aims to promote sustainable and inclusive industrialization, increase investment in infrastructure, and support technological innovation. It also calls for increased access to affordable and reliable internet and other communication technologies. Achieving this goal would promote economic growth and reduce poverty and inequality, as well as support environmental sustainability and social inclusion.`
      , sdgImage: './assets/sdg_9.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 10,
      name: 'Reduced Inequalities',
      information: `The tenth SDG aims to reduce inequality by promoting social, economic, and political inclusion for all. It also calls for policies that address discrimination and exclusion, promote equal opportunities, and reduce`
      , sdgImage: './assets/sdg_10.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 11,
      name: 'Sustainable Cities and Communities',
      information: `The eleventh SDG aims to make cities and human settlements inclusive, safe, resilient, and sustainable. It calls for increased investment in sustainable urban planning, infrastructure, and transport systems, as well as improving access to green spaces and reducing air pollution. Achieving this goal would improve living conditions and health outcomes for urban populations, as well as promote social and economic development.`
      , sdgImage: './assets/sdg_11.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 12,
      name: 'Responsible Consumption and Production',
      information: `The twelfth SDG aims to promote sustainable consumption and production patterns, reducing waste and increasing resource efficiency. It calls for policies that encourage sustainable practices in businesses and households, as well as promoting sustainable procurement and reducing food waste. Achieving this goal would reduce environmental degradation and support economic growth and social inclusion.`
      , sdgImage: './assets/sdg_12.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 13,
      name: 'Climate Action',
      information: `The thirteenth SDG aims to take urgent action to combat climate change and its impacts. This includes reducing greenhouse gas emissions, promoting renewable energy, and enhancing climate resilience and adaptation. Achieving this goal is crucial for ensuring the sustainability of our planet and protecting the well-being of future generations.`
      , sdgImage: './assets/sdg_13.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 14,
      name: 'Life Below Water',
      information: `The fourteenth SDG aims to conserve and sustainably use the oceans, seas, and marine resources for sustainable development. This includes reducing marine pollution, protecting marine habitats, and promoting sustainable fishing practices. Achieving this goal would not only support marine ecosystems, but also promote economic growth and social development.`
      , sdgImage: './assets/sdg_14.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 15,
      name: 'Life On Land',
      information: `The fifteenth SDG aims to protect, restore, and promote the sustainable use of terrestrial ecosystems, including forests, wetlands, and biodiversity. It calls for increased efforts to combat land degradation, conserve natural habitats, and combat illegal wildlife trafficking. Achieving this goal would not only support the well-being of ecosystems and biodiversity, but also promote sustainable development and poverty reduction.`
      , sdgImage: './assets/sdg_15.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 16,
      name: 'Peace, Justice and Strong Institutions',
      information: `The sixteenth SDG aims to promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable, and transparent institutions at all levels. It calls for policies that promote human rights, reduce violence, and combat corruption and illicit financial flows. Achieving this goal would support sustainable development and promote social inclusion and human dignity.`
      , sdgImage: './assets/sdg_16.png',
      arrowImage: './assets/arrow.png',
      state: 'default'
    },
    {
      id: 17,
      name: 'Partnerships for the Goals',
      information: `The seventeenth SDG aims to strengthen global partnerships for sustainable development, including partnerships between governments, civil society, and the private sector. It calls for increased cooperation and collaboration to achieve the SDGs, as well as promoting technology transfer and capacity building in developing countries. Achieving this goal would support the achievement of all the SDGs and promote global sustainability and prosperity.`
      , sdgImage: './assets/sdg_17.png',
      arrowImage: '/assets/arrow.png',
      state: 'default'
    }
  ]

  showInformation(sdg: Sdg) {
    this.isSdgOpened[sdg.id] = !this.isSdgOpened[sdg.id]
  }

  rotate(sdg: Sdg) {
    sdg.state = sdg.state === 'default' ? 'rotated' : 'default';
  }
}
