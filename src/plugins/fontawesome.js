import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBriefcase,
  faChessKnight,
  faChevronDown,
  faCircleCheck,
  faClapperboard,
  faCloud,
  faCode,
  faEnvelope,
  faGraduationCap,
  faLocationDot,
  faPenRuler,
  faStar,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons'
import {
  faDribbble,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

library.add(
  faBriefcase,
  faChessKnight,
  faChevronDown,
  faCircleCheck,
  faClapperboard,
  faCloud,
  faCode,
  faEnvelope,
  faGraduationCap,
  faLocationDot,
  faPenRuler,
  faStar,
  faTerminal,
  faDribbble,
  faGithub,
  faLinkedin,
)

export { FontAwesomeIcon }
