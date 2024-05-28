import {
  ButtonIcon,
  CodeIcon,
  HeadingIcon,
  ImageIcon,
  Link1Icon,
  TextIcon,
  ThickArrowDownIcon,
} from '@radix-ui/react-icons';

const iconProps = {
  width: '35px',
  height: '35px',
};

const tools = [
  {
    name: 'Heading',
    icon: <HeadingIcon {...iconProps} />,
  },
  {
    name: 'Text',
    icon: <TextIcon {...iconProps} />,
  },
  {
    name: 'Image',
    icon: <ImageIcon {...iconProps} />,
  },
  {
    name: 'Button',
    icon: <ButtonIcon {...iconProps} />,
  },
  {
    name: 'Link',
    icon: <Link1Icon {...iconProps} />,
  },
  {
    name: 'Code',
    icon: <CodeIcon {...iconProps} />,
  },
  {
    name: 'MarkDown',
    icon: <ThickArrowDownIcon {...iconProps} />,
  },
];

const Toolbar = () => {
  return (
    <section className='bg-zinc-900 w-full h-full flex gap-2 flex-wrap content-start p-10 '>
      {tools.map((tool) => {
        return (
          <button
            key={tool.name}
            className='bg-zinc-800 rounded hover:bg-zinc-700 transition text-white/50 hover:text-white h-[150px] w-[150px] flex flex-col items-center justify-center p-4 '
          >
            <span className='mb-2'>{tool.icon}</span>
            <p>{tool.name}</p>
          </button>
        );
      })}
    </section>
  );
};

export default Toolbar;
